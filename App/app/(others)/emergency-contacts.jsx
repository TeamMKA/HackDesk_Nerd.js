import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Icons
import * as Location from 'expo-location'; // For getting location
import * as Permissions from 'expo-permissions'; // For requesting permissions

const EmergencyContacts = () => {
  const [location, setLocation] = useState(null);

  // List of emergency contacts
  const contacts = [
    { name: "Mom", phone: "+911234567890" },
    { name: "Dad", phone: "+919876543210" },
    { name: "Friend", phone: "+919321775365" },
    { name: "Sister", phone: "+918879802217" },
  ];

  // Function to get user's current location
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to send your location.');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  // Function to send SMS with emergency message and location
  const sendEmergencySMS = async (phone) => {
    await getLocation(); // First get the location

    // Default message
    let message = "This is an emergency! Please help, I'm in danger and need assistance.";

    // Append location if available
    if (location) {
      const { latitude, longitude } = location.coords;
      message += `\n\nMy current location is: https://maps.google.com/?q=${latitude},${longitude}`;
    } else {
      message += `\n\nLocation not available.`;
    }

    // Create the SMS URL
    const url = `sms:${phone}?body=${encodeURIComponent(message)}`;

    // Open the SMS app with the pre-filled message
    Linking.openURL(url).catch(err => {
      Alert.alert("Error", "Failed to send message. Please try again.");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7F0]">
      <ScrollView contentContainerStyle="flex-grow p-4">
        <Text className="text-2xl font-bold text-center mb-6">Emergency Contacts</Text>

        {/* List of Emergency Contacts */}
        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            className="bg-orange-400 rounded-md p-4 mb-4 flex-row items-center justify-between mx-3"
            onPress={() => sendEmergencySMS(contact.phone)}
          >
            <View className="flex-row items-center">
              <Feather name="phone" size={24} color="white" />
              <Text className="text-white text-lg font-semibold ml-4">{contact.name}</Text>
            </View>
            <Text className="text-white text-base">{contact.phone}</Text>
          </TouchableOpacity>
        ))}

        {/* Info about using this screen */}
        <View className="mt-6 p-4 bg-blue-100 rounded-md">
          <Text className="text-blue-700 text-sm">
            Tap on a contact to send an emergency message with your location. This will open your messaging app with a pre-filled emergency message.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyContacts;
