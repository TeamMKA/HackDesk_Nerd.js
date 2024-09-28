import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = () => {
  const mapTilerAPIKey = 'bkvtUEamLwAwoV2q2Tpj'; // Replace with your MapTiler API key

  // State to toggle incidents visibility
  const [showIncidents, setShowIncidents] = useState(true);
  const [incidents, setIncidents] = useState([]); // Incident data from backend
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Fetch incidents from the backend
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('https://qd1v2drq-8000.inc1.devtunnels.ms/api/incidents'); // Replace with your actual API URL
        setIncidents(response.data); // Assuming response.data contains an array of incidents
        setLoading(false);
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setLoading(false);
      }
    };

    fetchIncidents();
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
          incidents.map((incident) => (
            <Marker
              key={incident.id}
              coordinate={incident.location}
              title={incident.title}
              description={incident.description}
            />
          ))
        }
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
