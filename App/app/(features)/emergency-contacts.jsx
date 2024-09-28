import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const translations = {
  en: {
    title: "Emergency Contacts",
    info: "Tap on a contact to send an emergency message with your location. This will open your messaging app with a pre-filled emergency message.",
    languageSelector: "Select Language",
    emergencyMessage: "This is an emergency! Please help, I'm in danger and need assistance.",
    locationNotAvailable: "Location not available.",
    contacts: {
      mom: "Mom",
      dad: "Dad",
      friend: "Friend",
      sister: "Sister",
    },
  },
  hi: {
    title: "आपातकालीन संपर्क",
    info: "अपने स्थान के साथ एक आपातकालीन संदेश भेजने के लिए किसी संपर्क पर टैप करें। यह आपके मैसेजिंग ऐप को एक पूर्व-भरित आपातकालीन संदेश के साथ खोलेगा।",
    languageSelector: "भाषा चुनें",
    emergencyMessage: "यह एक आपात स्थिति है! कृपया मदद करें, मैं खतरे में हूं और सहायता की आवश्यकता है।",
    locationNotAvailable: "स्थान उपलब्ध नहीं है।",
    contacts: {
      mom: "माँ",
      dad: "पिता",
      friend: "मित्र",
      sister: "बहन",
    },
  },
  mr: {
    title: "आणीबाणीचे संपर्क",
    info: "आपल्या स्थानासह आणीबाणीचा संदेश पाठवण्यासाठी संपर्कावर टॅप करा. हे आपल्या मेसेजिंग अॅपला पूर्व-भरलेल्या आणीबाणीच्या संदेशासह उघडेल.",
    languageSelector: "भाषा निवडा",
    emergencyMessage: "ही आणीबाणीची परिस्थिती आहे! कृपया मदत करा, मी धोक्यात आहे आणि मला मदतीची गरज आहे.",
    locationNotAvailable: "स्थान उपलब्ध नाही.",
    contacts: {
      mom: "आई",
      dad: "बाबा",
      friend: "मित्र",
      sister: "बहीण",
    },
  },
  gu: {
    title: "કટોકટી સંપર્કો",
    info: "તમારા સ્થાન સાથે કટોકટીનો સંદેશ મોકલવા માટે સંપર્ક પર ટેપ કરો. આ તમારી મેસેજિંગ એપ્લિકેશનને પૂર્વ-ભરેલા કટોકટી સંદેશ સાથે ખોલશે.",
    languageSelector: "ભાષા પસંદ કરો",
    emergencyMessage: "આ એક કટોકટી છે! કૃપા કરીને મદદ કરો, હું ખતરામાં છું અને મદદની જરૂર છે.",
    locationNotAvailable: "સ્થાન ઉપલબ્ધ નથી.",
    contacts: {
      mom: "માતા",
      dad: "પિતા",
      friend: "મિત્ર",
      sister: "બહેન",
    },
  },
  ta: {
    title: "அவசர தொடர்புகள்",
    info: "உங்கள் இருப்பிடத்துடன் அவசர செய்தியை அனுப்ப ஒரு தொடர்பைத் தட்டவும். இது உங்கள் மெசேஜிங் பயன்பாட்டை முன்கூட்டியே நிரப்பப்பட்ட அவசர செய்தியுடன் திறக்கும்.",
    languageSelector: "மொழியைத் தேர்ந்தெடுக்கவும்",
    emergencyMessage: "இது ஒரு அவசர நிலை! தயவுசெய்து உதவுங்கள், நான் ஆபத்தில் இருக்கிறேன் மற்றும் உதவி தேவை.",
    locationNotAvailable: "இருப்பிடம் கிடைக்கவில்லை.",
    contacts: {
      mom: "அம்மா",
      dad: "அப்பா",
      friend: "நண்பர்",
      sister: "சகோதரி",
    },
  },
};

const EmergencyContacts = () => {
  const [location, setLocation] = useState(null);
  const [language, setLanguage] = useState('en');

  const contacts = [
    { key: 'mom', phone: "+911234567890" },
    { key: 'dad', phone: "+919876543210" },
    { key: 'friend', phone: "+919321775365" },
    { key: 'sister', phone: "+918879802217" },
  ];

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to send your location.');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  const sendEmergencySMS = async (phone) => {
    await getLocation();

    let message = translations[language].emergencyMessage;

    if (location) {
      const { latitude, longitude } = location.coords;
      message += `\n\nhttps://maps.google.com/?q=${latitude},${longitude}`;
    } else {
      message += `\n\n${translations[language].locationNotAvailable}`;
    }

    const url = `sms:${phone}?body=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(err => {
      Alert.alert("Error", "Failed to send message. Please try again.");
    });
  };

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ta', name: 'தமிழ்' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F0' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
          {translations[language].title}
        </Text>

        {/* Language Selector */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8 }}>{translations[language].languageSelector}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {languageOptions.map((option) => (
              <TouchableOpacity
                key={option.code}
                style={{
                  backgroundColor: language === option.code ? '#007AFF' : '#E0E0E0',
                  padding: 8,
                  borderRadius: 4,
                  marginRight: 8,
                }}
                onPress={() => setLanguage(option.code)}
              >
                <Text style={{ color: language === option.code ? 'white' : 'black' }}>
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Emergency Contacts */}
        {contacts.map((contact) => (
          <TouchableOpacity
            key={contact.key}
            style={{
              backgroundColor: '#FFA500',
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}
            onPress={() => sendEmergencySMS(contact.phone)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="phone" size={24} color="white" />
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', marginLeft: 16 }}>
                {translations[language].contacts[contact.key]}
              </Text>
            </View>
            <Text style={{ color: 'white', fontSize: 16 }}>{contact.phone}</Text>
          </TouchableOpacity>
        ))}

        {/* Info Text */}
        <View style={{ marginTop: 24, padding: 16, backgroundColor: '#E6F3FF', borderRadius: 8 }}>
          <Text style={{ color: '#0066CC', fontSize: 14 }}>
            {translations[language].info}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyContacts;