import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';

const EducationalResources = () => {
    const resources = [
        {
            title: 'Understanding Safety Ratings',
            description: 'Learn how safety ratings are calculated and what factors to consider.',
            link: 'https://www.youtube.com/watch?v=ytSXuJ9CVWY', // Replace with actual links
        },
        {
            title: 'How to Report an Incident',
            description: 'A step-by-step guide on reporting safety incidents in real time.',
            link: 'https://www.youtube.com/watch?v=5ZEPMDJXsXk',
        },
        {
            title: 'Understanding Crime Trends',
            description: 'Insights into analyzing crime trends and data interpretation.',
            link: 'https://www.youtube.com/watch?v=example3',
        },
        {
            title: 'Using the Safety Heatmap',
            description: 'How to read and utilize the safety heatmap effectively.',
            link: 'https://www.youtube.com/watch?v=example4',
        },
        {
            title: 'Navigating Safely',
            description: 'Tips for safe navigation in urban areas.',
            link: 'https://www.youtube.com/watch?v=example5',
        },
    ];

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <Text className="text-2xl font-bold text-center mb-6">Educational Resources</Text>
            {resources.map((resource, index) => (
                <View key={index} className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
                    <Text className="text-xl font-semibold mb-2">{resource.title}</Text>
                    <Text className="text-gray-700 mb-4">{resource.description}</Text>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(resource.link)}
                        className="text-blue-500 hover:underline"
                    >
                        <Text className="underline">Watch Now</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default EducationalResources;
