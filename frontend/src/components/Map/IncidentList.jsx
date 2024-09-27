/* eslint-disable react/prop-types */
// IncidentList.js

const IncidentList = ({ incidents }) => {
  return (
    <div style={{ padding: '10px', maxHeight: '300px', overflowY: 'auto',color: 'white'  }}>
      <h3>Reported Incidents</h3>
      {incidents.length === 0 ? (
        <p>No incidents reported.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id} style={{ marginBottom: '10px' }}>
              <strong>Type:</strong> {incident.incidentType}<br />
              <strong>Description:</strong> {incident.description}<br />
              <strong>Location:</strong> ({incident.location.lat}, {incident.location.lng})<br />
              {incident.photoFiles.length > 0 && (
                <div>
                  <strong>Photos:</strong>
                  {incident.photoFiles.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Incident ${incident.id} Photo ${index + 1}`}
                      style={{ width: '100px', margin: '5px' }}
                    />
                  ))}
                </div>
              )}
              {incident.videoFiles.length > 0 && (
                <div>
                  <strong>Videos:</strong>
                  {incident.videoFiles.map((file, index) => (
                    <video key={index} controls style={{ width: '100px', margin: '5px' }}>
                      <source src={URL.createObjectURL(file)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}
              {incident.audioFile && (
                <div>
                  <strong>Audio:</strong>
                  <audio controls>
                    <source src={URL.createObjectURL(incident.audioFile)} type="audio/wav" />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;
