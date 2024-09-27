import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import PostCard from "../../components/PostCard"; // Import PostCard component
import {icons, images} from "./../../constants"
import HomePageCard from "../../components/HomePageCard";


const Home = () => {
  const cardData = [
    { title: "Safest Route", img: icons.safest_route },
    { title: "Disability", img: icons.play },
    { title: "Report Incident", img: icons.report_incident },
    { title: "Safety Alerts", img: icons.safety_alerts },
    { title: "Find Nearby", img: icons.find_nearby },
    { title: "Emergency Contacts", img: icons.emergency_contacts },
  ];

  const postData = [
    {
        type: "Accident",
        location: "Malad, Mumbai",
        description: "Two cars collided at the junction. No casualties, but heavy traffic.",
        img: "https://via.placeholder.com/150", // Image URL
        audio: null, // No audio for this incident
        video: null, // No video for this incident
        comments: ['This is so sad', 'Hope everyone is safe'], // Ensure comments is defined
        like: 10,
    },
    {
        type: "Suspicious Activity",
        location: "Goregaon, Mumbai",
        description: "Suspicious individual seen lurking near parked vehicles. Reported to local authorities.",
        img: null, // No image for this incident
        audio: null, // No audio for this incident
        video: "https://www.w3schools.com/html/mov_bbb.mp4", // Video URL
        comments: [], // Initialize as an empty array
        like: 5,
    },
    {
        type: "Robbery",
        location: "Andheri, Mumbai",
        description: "A purse snatching incident happened last night at Andheri West. Be cautious!",
        img: null, // No image for this incident
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Audio URL
        video: null, // No video for this incident
        comments: [], // Initialize as an empty array
        like: 2,
    }
];

  

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7F0]">
      <ScrollView contentContainerStyle="flex-grow p-4">
        <View className="mt-10 flex-row justify-between mx-3">
          <View className="">
            <Text className="text-xl text-gray-500">Hello, </Text>
            <Text className="text-2xl font-extrabold">Hi Raj</Text>
          </View>
          <Image source={images.profile} className="rounded-full h-16 w-16" />
        </View>

        <View className="bg-blue-400 rounded-md mx-4 mt-12 p-4">
          <View className="flex-row justify-around items-center">
            <Image source={icons.location_marker} className="h-16 w-16 rounded-full" />
            <Text className="text-white font-psemibold text-xl">Your Location</Text>
          </View>
          <Text className="text-white font-pmedium text-right mr-12">Malad</Text>
        </View>

        <View className="flex-row flex-wrap mt-8">
          {cardData.map((card, index) => (
            <View key={index} className="w-1/3 p-2">
              <HomePageCard title={card.title} img={card.img} />
            </View>
          ))}
        </View>

        {/* Nearest Posts Section */}
        <View className="mx-4 mt-5">
          <Text className="font-pbold text-xl mb-4">Nearest Posts</Text>
          {postData.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
