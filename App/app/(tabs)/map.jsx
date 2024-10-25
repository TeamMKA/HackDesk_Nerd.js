import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = () => {
  const mapTilerAPIKey = 'bkvtUEamLwAwoV2q2Tpj'; // Replace with your MapTiler API key

  const [showIncidents, setShowIncidents] = useState(true); // Toggle to show/hide incidents
  const [incidents, setIncidents] = useState([]); // Incident data from the backend
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Fetch incidents from the backend
    const fetchIncidents = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get('https://qd1v2drq-8000.inc1.devtunnels.ms/api/posts/get-post'); // Replace with your actual API URL
        const data = response.data; // Assuming response.data contains an array of incidents

        // Extract latitude and longitude from the response
        const coordinates = data.map(({ latitude, longitude }) => ({
          latitude,
          longitude,
        }));

        // Create dummy incidents
        const dummyIncidents = [
          {
            latitude: 19.0760,
            longitude: 72.8777,
            type: 'Dummy Incident 1',
            description: 'Description for dummy incident 1',
          },
          {
            latitude: 19.010405,
            longitude: 72.834275,
            type: 'Dummy Incident 2',
            description: 'Description for dummy incident 2',
          },
          {
            latitude: 19.09600,
            longitude: 72.897712,
            type: 'Dummy Incident 3',
            description: 'Description for dummy incident 3',
          },
        ];

        // Combine fetched incidents with dummy incidents
        setIncidents([...data, ...dummyIncidents]); // Update incidents state with the API response and dummy incidents
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setLoading(false); // Stop loading even in case of error
      }
    };

    fetchIncidents(); // Call the function to fetch data on component mount
  }, []);

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.0760, // Center around Mumbai (latitude and longitude)
          longitude: 72.8777,
          latitudeDelta: 0.05, // Zoom level
          longitudeDelta: 0.05,
        }}
      >
        {/* MapTiler Tile Layer */}
        <UrlTile
          urlTemplate={`https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.png?key=${mapTilerAPIKey}`}
          maximumZ={19}
          flipY={false} // For non-flipped tiles
        />

        {/* Show incidents if toggled on */}
        {showIncidents &&
          incidents.map((incident, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: incident.latitude,
                longitude: incident.longitude,
              }}
              title={incident.type}
              description={incident.description}
            />
          ))}
      </MapView>

      {/* Buttons to toggle incidents visibility */}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={showIncidents ? 'Hide Incidents' : 'Show Incidents'}
            onPress={() => setShowIncidents(!showIncidents)}
            color={showIncidents ? 'red' : 'green'}
          />
        </View>
      </View>

      {/* Loading Spinner */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Position the buttons near the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center', // Center buttons horizontally
  },
  button: {
    width: 150, // Button width
    marginHorizontal: 10, // Space between buttons
    borderRadius: 10, // Rounded corners for the button container
    overflow: 'hidden', // Ensures rounded corners on Button
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default MapScreen;
