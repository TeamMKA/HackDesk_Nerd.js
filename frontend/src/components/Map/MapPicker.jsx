/* eslint-disable react/prop-types */
// MapPicker.js
import  { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    setMarkerPosition([lat, lng]);
    onLocationSelect({ lat, lng }); // Pass the selected location to parent
  };

  return (
    <MapContainer
      center={[19.076, 72.8777]} // Default center around Mumbai
      zoom={12}
      style={{ height: '400px', width: '100%' }}
      onClick={handleMapClick}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_MAPTILER_API_KEY`}
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> contributors'
      />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Selected Location: {markerPosition[0].toFixed(5)}, {markerPosition[1].toFixed(5)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapPicker;
