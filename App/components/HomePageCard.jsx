import { View, Text, Image } from 'react-native'
import React from 'react'


const HomePageCard = ({title, img}) => {
  return (
    <View className="">
      <Image source={img} className="h-16 w-16 rounded-full bg-gray-300 mx-auto"/>
      <Text className="text-gray-400 text-center">{title}</Text>
    </View>
  )
}

export default HomePageCard