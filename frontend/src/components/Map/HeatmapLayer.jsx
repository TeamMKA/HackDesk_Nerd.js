/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

const HeatmapLayer = ({ isVisible }) => {
  const map = useMap();
  const [userLocation, setUserLocation] = useState(null);

  // Function to get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          map.setView([position.coords.latitude, position.coords.longitude], 13); // Center the map on user's location
        },
        (error) => {
          console.error("Error retrieving geolocation: ", error);
        }
      );
    }
  }, [map]);

  useEffect(() => {
    let heatLayer;

    if (isVisible && userLocation) {
      const points = [
        [...userLocation, 1.0],  // User's location
        [userLocation[0] + 0.01, userLocation[1] + 0.01, 0.7],
        [userLocation[0] - 0.01, userLocation[1] - 0.01, 0.5],
      ];

      heatLayer = L.heatLayer(points, {
        radius: 40,  // Larger radius for stronger effect
        blur: 25,    // Higher blur for smoother transitions
        maxZoom: 12, // Adjust zoom to match map level
        max: 1.0,    // Increase max intensity for heat
        gradient: {
          0.4: 'blue',
          0.6: 'lime',
          0.8: 'orange',
          1.0: 'red',  // Darker red for high intensity
        },
      }).addTo(map);
    }

    return () => {
      if (heatLayer) {
        map.removeLayer(heatLayer); // Remove heatmap when hidden
      }
    };
  }, [isVisible, map, userLocation]);

  return null;
};

export default HeatmapLayer;
