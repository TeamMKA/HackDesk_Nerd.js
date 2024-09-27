/* eslint-disable react/prop-types */
import  { useState } from 'react';

// eslint-disable-next-line no-unused-vars
const IncidentForm = ({ onSubmit, currentLocation }) => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [inputMode, setInputMode] = useState('manual'); // Track the input mode

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({ 
          lat: position.coords.latitude, 
          lng: position.coords.longitude 
        });
        setInputMode('current'); // Switch to current location mode
      }, (error) => {
        console.error("Error getting location: ", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handlePhotoChange = (e) => {
    setPhotoFiles([...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideoFiles([...e.target.files]);
  };

  const handleAudioRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          recorder.ondataavailable = (e) => {
            setAudioFile(e.data);
          };

          recorder.start();
          setIsRecording(true);

          recorder.onstop = () => {
            setIsRecording(false);
          };
        })
        .catch((err) => {
          console.error('Error accessing microphone:', err);
        });
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const handleInputChange = (e) => {
    const [lat, lng] = e.target.value.split(',').map(coord => coord.trim());
    setLocation({ lat, lng });
    setInputMode('manual'); // Switch to manual input mode
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incidentData = { 
      incidentType, 
      description, 
      location, 
      photoFiles, 
      videoFiles, 
      audioFile 
    };
    onSubmit(incidentData);
    // Reset form fields
    setIncidentType('');
    setDescription('');
    setLocation({ lat: '', lng: '' });
    setPhotoFiles([]);
    setVideoFiles([]);
    setAudioFile(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <h3>Report an Incident</h3>
      <label>
        Incident Type:
        <select value={incidentType} onChange={(e) => setIncidentType(e.target.value)} required>
          <option value="">Select</option>
          <option value="theft">Theft</option>
          <option value="accident">Accident</option>
          <option value="harassment">Harassment</option>
          <option value="suspicious_activity">Suspicious Activity</option>
        </select>
      </label>
      <br />
      <label>
        Description:
        <textarea 
          style={{ color: 'white', backgroundColor: 'black' }} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </label>
      <br />
      <label>
        Location:
        <div>
          <button type="button" onClick={handleLocationFetch}>Use My Current Location</button>
          <button type="button" onClick={() => setInputMode('manual')}>Enter Manually</button>
        </div>
        {inputMode === 'manual' && (
          <input
            type="text"
            value={`${location.lat || ''}, ${location.lng || ''}`}
            onChange={handleInputChange}
            style={{ color: 'white', backgroundColor: 'black' }}
            placeholder="Enter latitude, longitude"
          />
        )}
        {inputMode === 'current' && (
          <input
            type="text"
            value={`${location.lat}, ${location.lng}`}
            readOnly
            style={{ color: 'white', backgroundColor: 'black' }}
          />
        )}
      </label>
      <br />
      <label>
        Upload Photos:
        <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
      </label>
      <br />
      <label>
        Upload Videos:
        <input type="file" multiple accept="video/*" onChange={handleVideoChange} />
      </label>
      <br />
      <label>
        Record Audio Message:
        <button type="button" onClick={isRecording ? stopAudioRecording : handleAudioRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {audioFile && <p>Audio recorded. Ready to submit!</p>}
      </label>
      <br />
      <button type="submit">Submit Incident</button>
    </form>
  );
};

export default IncidentForm;
