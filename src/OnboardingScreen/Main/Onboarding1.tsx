import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import WorkExperienceForm from '../../screens/calendar';

export default function OnboardingForm() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState(null);

const pickImage = async () => {
  // const result = await launchImageLibrary({ mediaType: 'photo' }, (response) => {
  //   if (!response.didCancel && !response.errorCode) {
  //     const uri = response.assets[0].uri;
  //     setImageUri(uri);
  //   }
  // });
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
       <View style={styles.logoContainer}>
      <Image source={require('../../../assets/image/logo.png')} style={styles.logo} />
      
      </View>

      <View style={styles.separator} />

      <Text style={styles.title}>Personal Information</Text>
      <Text style={styles.label}>First Name</Text>
      <TextInput placeholder="First Name" style={styles.input} />
      <Text style={styles.label}>Last Name</Text>
      <TextInput placeholder="Last Name" style={styles.input} />
      <Text style={styles.label}>Email</Text>
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" />

      {/* Section 2: Profile Image Upload */}
      
      {/* <Text style={styles.title}>Upload Your Profil  <Text style={styles.label}>Profile Image</Text>
      {/* <View style={styles.imageUploadBox}>
        
        <Text style={styles.imageUploadText}>Tap to upload photo</Text>
      </View> */}

<View>
      <Text style={styles.label}>Profile Image</Text>
      <TouchableOpacity style={styles.imageUploadBox} onPress={() => {}}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageUploadText}>Tap to upload photo</Text>
        )}
      </TouchableOpacity>
    </View>
        


      {/* Section 3: Services Offered */}
      {/* <Image source={require('./assets/provenpro-logo.png')} style={styles.logo} /> */}
      {/* <Text style={styles.title}>Services Offered</Text> */}
      <Text style={styles.label}>Main Service Category</Text>
      <TextInput placeholder="e.g., Web Development,Design,Marketing" style={styles.input} />



      <View style={styles.formGroup}>
        <Text style={styles.label}>Service Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe your main services and expertise..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>



      <Text style={styles.label}>Rate Range</Text>
      <TextInput placeholder="e.g., $50-100/hour" style={styles.input} />
      <Text style={styles.label}>Availability</Text>
      <TextInput placeholder="e.g., Full-time,Part-time,Weekends only" style={styles.input} />


      {/* Section 4: Work Experience */}
      {/* <Image source={require('./assets/provenpro-logo.png')} style={styles.logo} /> */}
      {/* <Text style={styles.title}>Work Experience</Text> */}
      <Text style={styles.label}>Company Name</Text>
      <TextInput placeholder="Company Name" style={styles.input} />
      <Text style={styles.label}>Position</Text>
      <TextInput placeholder="Position" style={styles.input} />


      <Text style={styles.label}>Years of Experience</Text>
     <WorkExperienceForm/>

      <View style={styles.formGroup}>
        <Text style={styles.label}> Key Responsibilities</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe your Key Responsibilities and achievements..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  logoContainer: {
    marginTop: 5,
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'left',
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  imageUploadBox: {
    height: 130,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageUploadText: {
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: 0,
    marginBottom: 12,
  },
});
