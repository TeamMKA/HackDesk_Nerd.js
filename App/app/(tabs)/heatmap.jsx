

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import MapView, { Marker, Polyline, Polygon } from "react-native-maps";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome5'


// Static data for polygon areas (latitude, longitude)
const staticPolygons = [
    { center: [19.224552, 72.832728], radius: 400 },  // Example polygon 1
    { center: [19.210552, 72.842728], radius: 300 },  // Example polygon 2
    { center: [19.244552, 72.852728], radius: 500 },  // Example circle 3
    { center: [19.238552, 72.862728], radius: 200 },  // Example circle 4
    { center: [19.200552, 72.842728], radius: 600 },  // Example circle 5
    { center: [19.185552, 72.862728], radius: 350 },  // Example circle 6

    // Circles at Kurla
    { center: [19.065334, 72.878116], radius: 500 },  // Kurla area
    { center: [19.070334, 72.880116], radius: 400 },  // Nearby Kurla

    // Circles at Bandra
    { center: [19.054106, 72.840157], radius: 300 },  // Bandra area
    { center: [19.060106, 72.850157], radius: 250 },  // Nearby Bandra

    // Circles at Mumbai Central
    { center: [18.971575, 72.819379], radius: 600 },  // Mumbai Central area
    { center: [18.967575, 72.825379], radius: 400 },  // Nearby Mumbai Central

    // Circles at Mira Road
    { center: [19.285652, 72.868371], radius: 450 },  // Mira Road area
    { center: [19.290652, 72.870371], radius: 300 },  // Nearby Mira Road

    // Circles at Andheri
    { center: [19.113130, 72.831194], radius: 500 },  // Andheri area
    { center: [19.117130, 72.835194], radius: 400 },  // Nearby Andheri

    // Circles at Khar
    { center: [19.058764, 72.846485], radius: 300 },  // Khar area
    { center: [19.063764, 72.848485], radius: 250 },  // Nearby Khar

    // Circles at Ram Mandir
    { center: [19.085573, 72.834978], radius: 400 },  // Ram Mandir area
    { center: [19.090573, 72.836978], radius: 350 },  // Nearby Ram Mandir

    // Circles at Goregaon
    { center: [19.140953, 72.845131], radius: 500 },  // Goregaon area
    { center: [19.145953, 72.850131], radius: 300 },  // Nearby Goregaon

    // Circles at Dadar
    { center: [19.018580, 72.844430], radius: 400 },  // Dadar area
    { center: [19.022580, 72.846430], radius: 350 },  // Nearby Dadar

    // Circles at Matunga
    { center: [19.010405, 72.834275], radius: 300 },  // Matunga area
    { center: [19.015405, 72.836275], radius: 250 },  // Nearby Matunga

    // Circles at Sandhurst Road
    { center: [18.963583, 72.828850], radius: 400 },  // Sandhurst Road area
    { center: [18.965583, 72.830850], radius: 300 },  // Nearby Sandhurst Road

    // Circles at Byculla
    { center: [18.980701, 72.835415], radius: 450 },  // Byculla area
    { center: [18.983701, 72.837415], radius: 300 },  // Nearby Byculla

    // Circles at Worli
    { center: [19.007260, 72.826274], radius: 500 },  // Worli area
    { center: [19.010260, 72.828274], radius: 400 },
    
];

// Function to create a polygon from center and radius
const createPolygon = (center, radius) => {
    const coords = [];
    const numberOfPoints = 30; // More points for a smoother circle

    for (let i = 0; i < numberOfPoints; i++) {
        const angle = (i / numberOfPoints) * (2 * Math.PI);
        const lat = center[0] + (radius / 111300) * Math.cos(angle); // Rough conversion for latitude
        const lng = center[1] + (radius / (111300 * Math.cos(center[0] * Math.PI / 180))) * Math.sin(angle); // Rough conversion for longitude
        coords.push([lat, lng]);
    }
    return coords.map(coord => ({ latitude: coord[0], longitude: coord[1] }));
};

const MapComponent = () => {
    const [points, setPoints] = useState([]); // Points for routing
    const [route, setRoute] = useState(null);
    const [customMode, setCustomMode] = useState(false); // Toggle for custom mode

    // Function to handle map press events for waypoints
    const handleMapPress = (e) => {
        const newPoint = [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude];
        setPoints((prevPoints) => [...prevPoints, newPoint]);
    };

    // Function to request route from GraphHopper API
    const getRoute = async () => {
        if (points.length < 2) {
            console.error("At least 2 points are required for routing.");
            return; // Exit if not enough points
        }

        const graphHopperPoints = points.map((point) => [point[1], point[0]]);

        const requestData = {
            points: graphHopperPoints,
            snap_preventions: ["motorway", "ferry", "tunnel"],
            details: ["road_class", "surface"],
            profile: "car",
            locale: "en",
            instructions: true,
            calc_points: true,
            points_encoded: false,
        };

        if (customMode) {
            const polygons = staticPolygons.map((polygon) => {
                return createPolygon(polygon.center, polygon.radius);
            });

            requestData.custom_model = {
                priority: staticPolygons.map((_, index) => ({
                    if: `in_polygon_${index}`,
                    multiply_by: 0, // Avoid areas
                })),
                areas: {
                    type: "FeatureCollection",
                    features: polygons.map((polygon, index) => ({
                        type: "Feature",
                        id: `polygon_${index}`,
                        properties: {},
                        geometry: {
                            type: "Polygon",
                            coordinates: [[
                                ...polygon.map(coord => [coord.longitude, coord.latitude]),
                                [polygon[0].longitude, polygon[0].latitude] // Close the polygon
                            ]],
                        },
                    })),
                },
            };
            requestData["ch.disable"] = true; // Enable custom model
        }

        console.log("Request Data:", requestData);

        try {
            const response = await axios.post(
                "https://graphhopper.com/api/1/route?key=6ff72986-10c0-4ed7-8527-c6114fd63311", // Replace with your API key
                requestData
            );

            const graphHopperRoute =
                response.data.paths[0].points.coordinates.map((coord) => [
                    coord[1],
                    coord[0],
                ]);
            setRoute(graphHopperRoute);
        } catch (error) {
            console.error("Error fetching route:", error);
            if (error.response) {
                console.error("Server Response:", error.response.data);
            }
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 19.224552,
                    longitude: 72.832728,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {/* Plot markers for selected points */}
                {points.map((point, index) => (
                    <Marker key={index} coordinate={{ latitude: point[0], longitude: point[1] }} />
                ))}

                {/* Draw polyline for the route */}
                {route && <Polyline coordinates={route.map(coord => ({ latitude: coord[0], longitude: coord[1] }))} strokeColor="blue" strokeWidth={3} />}

                {/* Draw polygons for avoidance areas */}
                {staticPolygons.length > 0 &&
                    staticPolygons.map((polygon, index) => {
                        const coords = createPolygon(polygon.center, polygon.radius);
                        return (
                            <Polygon
                                key={index}
                                coordinates={coords}
                                strokeColor="red"
                                fillColor="rgba(255, 0, 0, 0.2)"
                                strokeWidth={2}
                            />
                        );
                    })}
            </MapView>

            {/* Toggle for custom mode */}
            <View style={styles.switchContainer}>
                <Text>Custom Mode (Avoid Areas with Polygons)</Text>
                <Switch
                    value={customMode}
                    onValueChange={() => setCustomMode((prev) => !prev)}
                />
            </View>

            {/* Circular Button to fetch and draw the route */}
            <TouchableOpacity style={styles.circleButton} onPress={getRoute}>
                <Icon name="route" size={35} color="white" />
                <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    switchContainer: {
        position: "absolute",
        top: 50,
        left: 10,
        zIndex: 1000,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
    circleButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapComponent;
