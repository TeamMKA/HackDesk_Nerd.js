import React, { useState } from 'react';
import { View, TextInput, Image, Button, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants';

const Profile = () => {
  const { user } = useGlobalContext();

  const [username, setUsername] = useState(user.data.user?.username || 'N/A');
  const [email, setEmail] = useState(user.data.user?.email || 'N/A');
  const profilePicUri = user?.profilepic || images.profile;

  // Handle date formatting
  const createdAt = user.data.user?.createdAt
    ? new Date(user.data.user.createdAt).toLocaleDateString()
    : 'N/A';

  const handleSave = () => {
    // Implement save functionality
    console.log('Save changes:', { username, email });
  };

  return (
    <View style={styles.container}>
      <Image source={profilePicUri} style={styles.profilePic} />
      
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Text style={styles.createdAtText}>
        Account Created: {createdAt}
      </Text>

      <Button title="Save" onPress={handleSave} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF7F0',
    padding: 16,
  },
  profilePic: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  createdAtText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default Profile;
