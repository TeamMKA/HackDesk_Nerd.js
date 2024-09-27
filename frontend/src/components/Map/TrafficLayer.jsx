/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const TrafficLayer = ({ apiKey, isVisible }) => {
  const map = useMap();
  const [trafficLayer, setTrafficLayer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          map.setView([position.coords.latitude, position.coords.longitude], 13); // Center map on user's location
        },
        (error) => {
          console.error("Error retrieving geolocation: ", error);
        }
      );
    }
  }, [map]);

  useEffect(() => {
    const updateTrafficLayer = () => {
      if (isVisible && userLocation) {
        const trafficUrl = `https://api.maptiler.com/maps/traffic/256/{z}/{x}/{y}.png?key=${apiKey}`;
        
        if (trafficLayer) {
          map.removeLayer(trafficLayer); // Remove the existing traffic layer
        }

        const newTrafficLayer = L.tileLayer(trafficUrl, {
          attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
        }).addTo(map);
        
        setTrafficLayer(newTrafficLayer);
      } else if (trafficLayer) {
        map.removeLayer(trafficLayer); // Remove traffic layer if not visible
        setTrafficLayer(null); // Reset trafficLayer state
      }
    };

    updateTrafficLayer(); // Initial update

    const intervalId = setInterval(updateTrafficLayer, 60000); // Update every 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [isVisible, map, apiKey, userLocation]);

  return null;
};

export default TrafficLayer;