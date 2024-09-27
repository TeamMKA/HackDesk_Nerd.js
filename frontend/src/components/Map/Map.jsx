import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';
import IncidentMarkers from './IncidentMarkers';
import IncidentForm from './IncidentForm';
import IncidentList from './IncidentList';

const Map = () => {
  const mapTilerAPIKey = 'bkvtUEamLwAwoV2q2Tpj'; // Replace with your MapTiler API key

  // State management
  const [showTraffic, setShowTraffic] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  // Handle incident form submission
  const handleIncidentSubmit = (incident) => {
    const newIncident = {
      ...incident,
      id: Math.random(), // Generate unique ID
      location: {
        lat: incident.location.lat,
        lng: incident.location.lng,
      },
    };

    setIncidents((prevIncidents) => [...prevIncidents, newIncident]);

    // Prepare form data for further processing
    const formData = new FormData();
    formData.append('incidentType', incident.incidentType);
    formData.append('description', incident.description);
    formData.append('location', JSON.stringify(newIncident.location));

    incident.photoFiles.forEach((file) => formData.append('photos', file));
    incident.videoFiles.forEach((file) => formData.append('videos', file));
    if (incident.audioFile) formData.append('audio', incident.audioFile);

    // Log form data for debugging
    console.log('Incident submitted:', formData);
  };

  // Handle map click to select a location
  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setMarkerPosition([lat, lng]);
    setSelectedLocation({ lat, lng });
  };

  return (
    <div className="bg-slate-50 p-4 w-full flex flex-col justify-center items-center ">
      {/* Toggle Buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setShowTraffic(!showTraffic)}
        >
          {showTraffic ? 'Hide Traffic' : 'Show Traffic'}
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => setShowIncidents(!showIncidents)}
        >
          {showIncidents ? 'Hide Incidents' : 'Show Incidents'}
        </button>
      </div>

      {/* Incident Reporting Form */}
      <IncidentForm onSubmit={handleIncidentSubmit} selectedLocation={selectedLocation} />

      {/* Map Container */}
      <MapContainer
        center={[19.076, 72.8777]} // Centered on Mumbai
        zoom={12}
        style={{ height: '90vh', width: '100%' }}
        onClick={handleMapClick}
      >
        {/* Base Map - Satellite view */}
        <TileLayer
          url={`https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=${mapTilerAPIKey}`}
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> contributors'
        />

        {/* Dynamic Layers */}
        {showHeatmap && <HeatmapLayer />}
        {showIncidents && <IncidentMarkers incidents={incidents} />}

        {/* Marker for selected location */}
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              Selected Location: {markerPosition[0].toFixed(5)}, {markerPosition[1].toFixed(5)}
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Display the list of reported incidents */}
      <IncidentList incidents={incidents} />
    </div>
  );
};

export default Map;
