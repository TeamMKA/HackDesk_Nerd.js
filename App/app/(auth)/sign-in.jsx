import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import {images} from '../../constants';

const SignIn = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Image source={images.logo}
        className="w-full h-[150px]"
        resizeMode="contain"
        />
      <Text className="text-2xl font-bold text-gray-800 mb-6">Sign In</Text>
      
      <TextInput
        placeholder="Email"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        secureTextEntry
      />

      <TouchableOpacity className="bg-blue-500 rounded-lg p-3 w-full">
        <Text className="text-white text-center font-semibold">Sign In</Text>
      </TouchableOpacity>

      <Text className="text-gray-600 mt-4">
        Don't have an account? 
        <Text className="text-blue-500 font-semibold" onPress={()=>router.push('/sign-up')}> Sign Up</Text>
      </Text>
    </View>
  );
}

export default SignIn;
