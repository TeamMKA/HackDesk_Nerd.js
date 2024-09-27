import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';

const MapScreen = () => {
  const mapTilerAPIKey = 'bkvtUEamLwAwoV2q2Tpj'; // Replace with your MapTiler API key

  // State to toggle incidents visibility
  const [showIncidents, setShowIncidents] = useState(true);
  
  // Sample incident data (you can replace this with actual dynamic data)
  const incidents = [
    {
      id: 1,
      title: 'Incident 1',
      description: 'Description for Incident 1',
      location: { latitude: 19.076, longitude: 72.8777 },
    },
    {
      id: 2,
      title: 'Incident 2',
      description: 'Description for Incident 2',
      location: { latitude: 19.1, longitude: 72.88 },
    },
  ];

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
});

export default MapScreen;
