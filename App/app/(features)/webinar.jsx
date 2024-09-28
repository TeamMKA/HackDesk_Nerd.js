import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';

const WebinarComponent = () => {
    const webinars = [
        {
            title: 'Understanding Safety in Urban Areas',
            description: 'Join us for a webinar discussing safety tips and best practices in urban areas.',
            date: 'October 1, 2024',
            time: '3:00 PM - 4:00 PM IST',
            meetLink: 'https://meet.google.com/abc-defg-hij', 
        },
        {
            title: 'Crime Prevention Strategies',
            description: 'Learn about effective crime prevention strategies during this informative session.',
            date: 'October 2, 2024',
            time: '5:00 PM - 6:00 PM IST',
            meetLink: 'https://meet.google.com/klm-nopq-rst',
        },
    ];

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <Text className="text-3xl font-bold text-center mb-6 text-gray-800">Upcoming Webinars</Text>
            {webinars.map((webinar, index) => (
                <View key={index} className="bg-white rounded-lg shadow-lg p-4 mb-6 border border-gray-300">
                    <Text className="text-xl font-semibold mb-2 text-gray-800">{webinar.title}</Text>
                    <Text className="text-gray-600 mb-2">{webinar.description}</Text>
                    <Text className="text-gray-500 mb-1">{`Date: ${webinar.date}`}</Text>
                    <Text className="text-gray-500 mb-4">{`Time: ${webinar.time}`}</Text>

                    <TouchableOpacity
                        onPress={() => Linking.openURL(webinar.zoomLink)}
                        className="bg-blue-600 text-white text-center py-2 rounded mb-2"
                    >
                        <Text className="font-semibold">Join Zoom Meeting</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Linking.openURL(webinar.meetLink)}
                        className="bg-green-600 text-white text-center py-2 rounded"
                    >
                        <Text className="font-semibold">Join Google Meet</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default WebinarComponent;
