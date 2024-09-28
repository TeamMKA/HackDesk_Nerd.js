import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, RefreshControl } from "react-native";
import PostCard from "../../components/PostCard"; // Import PostCard component
import { icons, images } from "./../../constants";
import HomePageCard from "../../components/HomePageCard";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const {user} = useGlobalContext()

  const cardData = [
    { title: "Safest Route", img: icons.safest_route, link: "/safest-route" },
    { title: "Book A Ride", img: icons.book_a_ride, link: "/book-a-ride" },
    { title: "Report Incident", img: icons.report_incident, link: "/report-incident" },
    { title: "Safety Alerts", img: icons.safety_alerts, link: "/safety-alerts" },
    { title: "Educational Resources", img: icons.find_nearby, link: "/educational-resources" },
    { title: "S. O. S.", img: icons.emergency_contacts, link: "/emergency-contacts" },
    { title: "Join Webinars", img: icons.webinar, link: "/webinar" },
    { title: "Chat Bot", img: icons.chat_bot, link: "/chat-bot" },
  ];

  const [postData, setPostData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get('https://qd1v2drq-8000.inc1.devtunnels.ms/api/posts/get-post');
      // console.log('Post data fetched:', response.data);
      setPostData(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error during fetching posts:", error.response ? error.response.data : error.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7F0] mt-10">
      <ScrollView
        contentContainerStyle="flex-grow p-4"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchData} // Call fetchData when user pulls to refresh
          />
        }
      >
        <View className="mt-10 flex-row justify-between mx-3">
          <View>
            <Text className="text-xl text-gray-500">Hello, </Text>
            <Text className="text-2xl font-extrabold">Hi {user.data.user.username}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/profile")}>  
          <Image source={images.profile} className="rounded-full h-16 w-16" />
          </TouchableOpacity>
        </View>

        <View className="bg-orange-400 rounded-md mx-4 mt-12 p-4">
          <View className="flex-row justify-around items-center">
            <Image source={icons.location_marker} className="h-16 w-16 rounded-full" />
            <Text className="text-white font-psemibold text-xl">Your Location</Text>
          </View>
          <Text className="text-white font-pmedium text-right mr-12">Malad</Text>
        </View>

        <View className="flex-row flex-wrap mt-8">
          {cardData.map((card, index) => (
            <View key={index} className="w-1/3 p-2">
              <HomePageCard title={card.title} img={card.img} link={card.link} />
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
