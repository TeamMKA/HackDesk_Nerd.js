/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const IncidentMarkers = ({ isVisible, incidents }) => {
  if (!isVisible) return null;

  return (
    <>
      {incidents.map(incident => (
        <Marker key={incident.id} position={[incident.location.lat, incident.location.lng]}>
          <Popup>
            <strong>{incident.incidentType}</strong><br />
            {incident.description}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default IncidentMarkers;
