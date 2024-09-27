import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { images } from '../../constants';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalProvider';


const SignUp = () => {
  const {setIsLogged,setUser,loading,setLoading} = useGlobalContext();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    console.log(form);
    const { username, email, password } = form;

    try {
        const response = await axios.post('https://6nddmv2g-8000.inc1.devtunnels.ms/api/users/register', {
            username,
            email,
            password
        });
        if(response.data){
          setIsLogged(true);
          setUser(response.data);
          router.push('/home');
        }
    } catch (error) {
        console.error("Error during registration:", error.response ? error.response.data : error.message);
        // You can also show an alert or a notification for the user
    }finally{
      setLoading(false);
    }
};


  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Image 
        source={images.logo}
        className="w-full h-[150px]"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-6">Sign Up</Text>

      <TextInput
        placeholder="Username"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        value={form.username}
        onChangeText={value => handleChange('username', value)}
      />

      <TextInput
        placeholder="Email"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        keyboardType="email-address"
        value={form.email}
        onChangeText={value => handleChange('email', value)}
      />

      <TextInput
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        secureTextEntry
        value={form.password}
        onChangeText={value => handleChange('password', value)}
      />

      <TouchableOpacity 
        className="bg-blue-500 rounded-lg p-3 w-full"
        onPress={submit}
      >
        <Text className="text-white text-center font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <Text className="text-gray-600 mt-4">
        Already have an account? 
        <Text 
          className="text-blue-500 font-semibold" 
          onPress={() => router.push('/sign-in')}
        > 
          Sign In
        </Text>
      </Text>
    </View>
  );
}

export default SignUp;
