import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import the Picker
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker
import axios from 'axios';

const CreateIncident = ({ onSubmit }) => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [location, setLocation] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]); // Change from single audioFile to array
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState();
  const [modalVisible, setModalVisible] = useState(false); // New state for map modal
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825, // Default latitude
    longitude: -122.4324, // Default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const incidentTypes = [
    'Select Incident Type',
    'Theft',
    'Accident',
    'Harassment',
    'Suspicious Activity',
    'Other',
  ];

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    setMapRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    fetchAreaFromCoordinates(loc.coords.latitude, loc.coords.longitude);
  };

  const fetchAreaFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      if (data && data.display_name) {
        setArea(data.display_name);
      }
    } catch (error) {
      console.error('Error fetching area:', error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const pickPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setPhotoFiles([...photoFiles, ...result.assets.map(asset => asset.uri)]);
      Alert.alert("Photo Saved", "Your file has been saved successfully!", [{ text: "OK" }]);
    }
  };

  const pickVideos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setVideoFiles([...videoFiles, ...result.assets.map(asset => asset.uri)]);
      Alert.alert("Video Saved", "Your file has been saved successfully!", [{ text: "OK" }]);
    }
  };

  const startAudioRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Error starting audio recording:', err);
    }
  };

  const stopAudioRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      setAudioFiles([...audioFiles, uri]); // Add recorded audio to audioFiles array

      Alert.alert("Recording Saved", "Your voice recording has been saved successfully!", [{ text: "OK" }]);
    }
  };

  const handleLocationSelect = (latitude, longitude) => {
    setLocation({ latitude, longitude });
    setModalVisible(false); // Close the modal
  };

  const handleSubmit = async () => {
    const incident = {
      type: incidentType,
      description,
      location: area, // Use area as the location
      latitude: location?.latitude || null,
      longitude: location?.longitude || null,
      photoFiles,
      videoFiles,
      audioFiles, // Send the array of audio files
    };
    console.log(incident);

    try {
      const response = await axios.post('https://qd1v2drq-8000.inc1.devtunnels.ms/api/posts/send-post', incident);
      console.log('Incident submitted successfully:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting incident:', error);
      alert('Error submitting incident: ' + error.response.data.message);
    }
  };

  const resetForm = () => {
    setIncidentType('');
    setDescription('');
    setArea('');
    setLocation(null);
    setPhotoFiles([]);
    setVideoFiles([]);
    setAudioFiles([]); // Reset audioFiles array
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Incident Type</Text>
      <Picker
        selectedValue={incidentType}
        onValueChange={(itemValue) => setIncidentType(itemValue)}
        style={styles.picker}
      >
        {incidentTypes.map((type, index) => (
          <Picker.Item label={type} value={type} key={index} />
        ))}
      </Picker>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Area</Text>
      <TextInput
        style={styles.input}
        placeholder="Area will be auto-filled"
        value={area}
        editable={false} // Make area input read-only
      />

      <View style={styles.locationContainer}>
        <TouchableOpacity style={styles.mapButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.mapButtonText}>Pick Location </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.currentLocationButton} onPress={getCurrentLocation}>
          <Text style={styles.currentLocationButtonText}>Current Location</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder={location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : 'Fetching current location...'}
        value={location ? `${location.latitude}, ${location.longitude}` : ''}
        editable={false}
      />

      <View style={styles.mediaButtonsContainer}>
        <TouchableOpacity style={styles.squareButton} onPress={pickPhotos}>
          <Icon2 name="photo" size={30} color="#fff" />
          <Text style={styles.buttonText}>Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareButton} onPress={pickVideos}>
          <Icon1 name="video" size={30} color="#fff" />
          <Text style={styles.buttonText}>Video</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.squareButton, isRecording && styles.buttonActive]} 
          onPress={isRecording ? stopAudioRecording : startAudioRecording}
        >
          <Icon2 name={isRecording ? 'microphone-slash' : 'microphone'} size={30} color="#fff" />
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop' : 'Record'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Incident</Text>
      </TouchableOpacity>

      {/* Modal for Map */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={(region) => setMapRegion(region)}
            onPress={(e) => handleLocationSelect(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
          >
            {location && (
              <Marker coordinate={location} title="Selected Location" />
            )}
          </MapView>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    backgroundColor: "#bab9b6"
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,

    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  squareButton: {
    backgroundColor: '#007BFF',
    flex: 1,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  currentLocationButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: 10,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  currentLocationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '50%', // Limit height of map
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default CreateIncident;
