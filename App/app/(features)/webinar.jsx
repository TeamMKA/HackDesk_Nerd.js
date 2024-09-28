import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import axios from 'axios';

const WebinarComponent = () => {
    const [webinars, setWebinars] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://6nddmv2g-8000.inc1.devtunnels.ms/api/webinars/get-webinars');
                setWebinars(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <Text className="text-3xl font-bold text-center mb-6 text-gray-800">Upcoming Webinars</Text>
            {webinars.map((webinar, index) => (
                <View key={index} className="bg-white rounded-lg shadow-lg p-4 mb-6 border border-gray-300 transition-transform duration-300 hover:scale-105">
                    <Text className="text-xl font-semibold mb-2 text-gray-800">{webinar.title}</Text>
                    <Text className="text-gray-600 mb-2">{webinar.description}</Text>
                    <Text className="text-gray-500 mb-1">{`Date: ${webinar.date}`}</Text>
                    <Text className="text-gray-500 mb-4">{`Time: ${webinar.time}`}</Text>

                    <TouchableOpacity
                        onPress={() => Linking.openURL(webinar.meetLink)}
                        className="bg-green-600 text-white text-center py-2 rounded-md shadow-md hover:bg-green-700 transition duration-200"
                    >
                        <Text className="font-semibold text-center">Join Google Meet</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default WebinarComponent;
