import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Alert, Linking } from "react-native";
import { Feather } from "@expo/vector-icons"; // Icons
import * as Location from 'expo-location'; // For getting location

const OneClickRideBooking = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to book a ride.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    fetchLocation();
  }, []);

  // Function to book a ride
  const bookRide = async () => {
    if (!location) {
      Alert.alert('Location not available', 'Unable to fetch location. Please try again.');
      return;
    }

    const { latitude, longitude } = location.coords;

    // Uber and Lyft URLs with dynamic location
    const uberUrl = `uber://?action=setPickup&pickup[latitude]=${latitude}&pickup[longitude]=${longitude}`;
    const lyftUrl = `lyft://ridetype?id=lyft&pickup[latitude]=${latitude}&pickup[longitude]=${longitude}`;
    const uberWebUrl = `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${latitude}&pickup[longitude]=${longitude}`;  // Fallback to Uber web URL

    const openRideService = async (url, serviceName, fallbackUrl) => {
      const supported = await Linking.canOpenURL(url);
      console.log(`Can open ${serviceName}: ${supported}`); // Logging

      if (supported) {
        Linking.openURL(url);
      } else if (fallbackUrl) {
        Linking.openURL(fallbackUrl); // Open web fallback if the app is not installed
      } else {
        return serviceName;
      }
    };

    const notSupportedService = await openRideService(uberUrl, "Uber", uberWebUrl);

    if (notSupportedService) {
      const notSupportedServiceLyft = await openRideService(lyftUrl, "Lyft", null);
      if (notSupportedServiceLyft) {
        Alert.alert("Ride Service Not Available", "Neither Uber nor Lyft app is installed on your phone.");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7F0] p-4">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold mb-6 text-center">Book a Ride Quickly</Text>
        
        <TouchableOpacity 
          className="bg-[#3b82f6] rounded-full py-4 px-8 flex-row items-center mb-6"
          onPress={bookRide}
        >
          <Feather name="arrow-right-circle" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">Book Ride</Text>
        </TouchableOpacity>

        <View className="bg-[#bfdbfe] rounded-md w-full p-6 mt-4">
          <Text className="text-[#1e3a8a] text-center text-lg">
            Tap the button to instantly open the Uber or Lyft app and book a ride from your current location.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OneClickRideBooking;
