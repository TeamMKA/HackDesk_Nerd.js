import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const HomePageCard = ({ title, img, link }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`${link}`)} className="flex items-center">
      <Image source={img} className="h-16 w-16 rounded-full bg-gray-300 mx-auto" />
      <Text className="text-gray-400 text-center">{title}</Text>
    </TouchableOpacity>
  );
}

export default HomePageCard;
