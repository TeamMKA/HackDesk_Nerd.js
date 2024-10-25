import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons"; // For audio, like, and comment icons
import { Video, Audio } from "expo-av";
import Icon from 'react-native-vector-icons/FontAwesome';

const PostCard = ({ post }) => {
    const { type, location, description, imageFiles, videoFile, audioFile, comments, like, dislike } = post;

    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [currentLikes, setCurrentLikes] = useState(like);
    const [currentDislikes, setCurrentDislikes] = useState(dislike); // Initialize with post dislike count
    const [commentList, setCommentList] = useState(comments);
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false); // State for tracking dislikes

    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync({ uri: audioFile });
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                setIsPlaying(false);
                sound.unloadAsync();
            }
        });
    };

    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(undefined);
            setIsPlaying(false);
        }
    };

    const handleCommentSubmit = () => {
        if (newComment) {
            setCommentList([...commentList, newComment]);
            setNewComment("");
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <View className="bg-white rounded-md shadow-md p-4 mb-4">
            {/* Incident Type and Location */}
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold">{type}</Text>
                <Text className="text-gray-500 text-sm">{location}</Text>
            </View>

            {/* Media (Image, Video, or Audio) */}
            {imageFiles.length > 0 && (
                imageFiles.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: img }}
                        className="h-40 w-full rounded-md mb-4"
                    />
                ))
            )}

            {videoFile && (
                <View className="h-40 w-full rounded-md mb-4">
                    <Video
                        source={{ uri: videoFile }}
                        useNativeControls
                        resizeMode="contain"
                        style={{ height: "100%", width: "100%", borderRadius: 10 }}
                    />
                </View>
            )}

            {audioFile && (
                <View className="flex-row items-center bg-gray-100 p-2 rounded-md mb-4">
                    <Feather name="mic" size={24} color="black" />
                    <TouchableOpacity className="ml-4" onPress={isPlaying ? stopAudio : playAudio}>
                        <Text className="text-blue-500">{isPlaying ? "Stop Audio" : "Play Audio"}</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text className="text-gray-700">{description}</Text>

            {/* Like and Dislike Section */}
            <View className="flex-row justify-between items-center mt-4">
                {/* Like Button (Upward Arrow) */}
                <TouchableOpacity
                    onPress={() => {
                        if (isLiked) {
                            setCurrentLikes(currentLikes - 1);
                        } else {
                            setCurrentLikes(currentLikes + 1);
                        }
                        setIsLiked(!isLiked);
                    }}
                    className="flex-row items-center"
                >
                    <Icon name="arrow-up" size={24} color={isLiked ? "#fb923c" : "gray"} />
                    <Text className="ml-2">{currentLikes}</Text>
                </TouchableOpacity>

                {/* Dislike Button (Downward Arrow) */}
                <TouchableOpacity
                    onPress={() => {
                        if (isDisliked) {
                            setCurrentDislikes(currentDislikes - 1);
                        } else {
                            setCurrentDislikes(currentDislikes + 1);
                        }
                        setIsDisliked(!isDisliked);
                    }}
                    className="flex-row items-center"
                >
                    <Icon name="arrow-down" size={24} color={isDisliked ? "blue" : "gray"} />
                    <Text className="ml-2">{currentDislikes}</Text>
                </TouchableOpacity>

                {/* Comment Button */}
                <TouchableOpacity onPress={toggleComments} className="flex-row items-center">
                    <Feather name="message-circle" size={24} color="gray" />
                    <Text className="ml-2">{commentList.length}</Text>
                </TouchableOpacity>
            </View>

            {/* Comments Section */}
            {showComments && (
                <View className="mt-4">
                    <Text className="font-bold">Comments:</Text>
                    {commentList.length > 0 ? (
                        commentList.map((comment, index) => (
                            <Text key={index} className="text-gray-600">- {comment}</Text>
                        ))
                    ) : (
                        <Text className="text-gray-600">No comments yet.</Text>
                    )}

                    {/* Comment Input */}
                    <TextInput
                        placeholder="Add a comment..."
                        value={newComment}
                        onChangeText={setNewComment}
                        className="border rounded-md p-2 mt-2"
                    />
                    <TouchableOpacity onPress={handleCommentSubmit} className="bg-blue-500 rounded-md p-2 mt-2">
                        <Text className="text-white text-center">Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default PostCard;
