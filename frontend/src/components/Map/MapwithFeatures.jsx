import  { useState } from 'react';
import Map from './Map';
import IncidentForm from './IncidentForm';

const MapWithFeatures = () => {
  const [incidents, setIncidents] = useState([]);

  const handleIncidentSubmit = (incident) => {
    const newIncident = {
      ...incident,
      id: Date.now(), // Generate a unique ID for the incident
      location: incident.location.split(',').map(Number), // Convert location string to numbers
    };

    // Add the new incident to the state
    setIncidents((prevIncidents) => [...prevIncidents, newIncident]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <IncidentForm onSubmit={handleIncidentSubmit} />
      <Map incidents={incidents} />
    </div>
  );
};

export default MapWithFeatures;
