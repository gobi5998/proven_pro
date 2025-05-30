import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RNBlobUtil from 'react-native-blob-util';
import type { Asset } from 'react-native-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface FormState {
  primaryTools: string;
  technicalSkills: string;
  softSkills: string;
  skillsDescription: string;
  projectTitle: string;
  projectDescription: string;
  projectURL: string;
  projectImages: string[];
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  certificateFile: { uri: string; name: string; type: string } | null;
  video: { uri: string } | null;
  videoDescription: string;
}

export default function MergedProfileForm() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [form, setForm] = useState<FormState>({
    primaryTools: '',
    technicalSkills: '',
    softSkills: '',
    skillsDescription: '',
    projectTitle: '',
    projectDescription: '',
    projectURL: '',
    projectImages: [],
    certificationName: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    certificateFile: null,
    video: null,
    videoDescription: '',
  });

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
      includeBase64: false,
    }, (response) => {
      if (!response.didCancel && response.assets) {
        setForm({ ...form, projectImages: response.assets.map(asset => asset.uri || '') });
      }
    });
  };

  const handleVideoPick = async () => {
    try {
      ImagePicker.launchImageLibrary({
        mediaType: 'video',
        selectionLimit: 1,
        includeBase64: false,
      }, (response) => {
        if (!response.didCancel && response.assets && response.assets[0]) {
          setForm({ ...form, video: { uri: response.assets[0].uri || '' } });
        }
      });
    } catch (err) {
      console.log('Video selection cancelled or failed: ', err);
    }
  };

  const handleCertificatePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 1,
        includeBase64: false,
      });

      if (!result.didCancel && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setForm({
          ...form,
          certificateFile: {
            uri: asset.uri || '',
            name: asset.fileName || 'certificate',
            type: asset.type || 'application/pdf'
          }
        });
      }
    } catch (err) {
      console.log('Certificate selection cancelled or failed: ', err);
    }
  };

  const ProfileImageUploader = () => {
    const [imageUri, setImageUri] = useState(null);
  
    const requestPermissionAndPickImage = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
          return;
        }
      }
    };
    return null;
  };

  const handleChange = (key: keyof FormState, value: FormState[keyof FormState]) => setForm({ ...form, [key]: value });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Onboarding1')}>
              <View style={styles.backButtonContent}>
              <Icon name="chevron-back" size={24} color="#3C5979" />
               <Text style={styles.backButtonText}>Back</Text>
              </View>
</TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Tools & Skills</Text>
        <Text style={styles.label}>Primary Tools</Text>
        <TextInput style={styles.input} placeholder="Primary Tools" value={form.primaryTools} onChangeText={text => handleChange('primaryTools', text)} />
        <Text style={styles.label}>Technical Skills</Text>
        <TextInput style={styles.input} placeholder="Technical Skills" value={form.technicalSkills} onChangeText={text => handleChange('technicalSkills', text)} />
        <Text style={styles.label}>Soft Skills</Text>
        <TextInput style={styles.input} placeholder="Soft Skills" value={form.softSkills} onChangeText={text => handleChange('softSkills', text)} />
        <Text style={styles.label}>Skills Description</Text>
        <TextInput style={styles.textArea} placeholder="Skills Description" value={form.skillsDescription} multiline onChangeText={text => handleChange('skillsDescription', text)} />

        <Text style={styles.title}>Portfolio</Text>
        <Text style={styles.label}>Project Title</Text>
        <TextInput style={styles.input} placeholder="Project Title" value={form.projectTitle} onChangeText={text => handleChange('projectTitle', text)} />
        <Text style={styles.label}>Project Description</Text>
        <TextInput style={styles.textArea} placeholder="Project Description" value={form.projectDescription} multiline onChangeText={text => handleChange('projectDescription', text)} />
        <Text style={styles.label}>Project URL</Text>
        <TextInput style={styles.input} placeholder="Project URL" value={form.projectURL} onChangeText={text => handleChange('projectURL', text)} />
        <Text style={styles.label}>Project Images</Text>
        <TouchableOpacity style={styles.imageUploadBox} onPress={handleImagePick}>
          <Text style={styles.imageUploadText}>Upload Project Images</Text>
        </TouchableOpacity>
        <View style={styles.imagePreviewContainer}>
          {form.projectImages.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} style={styles.previewImage} />
          ))}
        </View>

        <Text style={styles.title}>Licenses & Certifications</Text>
        <Text style={styles.label}>Certification Name</Text>
        <TextInput style={styles.input} placeholder="Certification Name" value={form.certificationName} onChangeText={text => handleChange('certificationName', text)} />
        <Text style={styles.label}>Issuing Organization</Text>
        <TextInput style={styles.input} placeholder="Issuing Organization" value={form.issuingOrganization} onChangeText={text => handleChange('issuingOrganization', text)} />
        <Text style={styles.label}>Issue Date</Text>
        <TextInput style={styles.input} placeholder="Issue Date (mm/dd/yyyy)" value={form.issueDate} onChangeText={text => handleChange('issueDate', text)} />
        <Text style={styles.label}>Expiry Date</Text>
        <TextInput style={styles.input} placeholder="Expiry Date (Optional)" value={form.expiryDate} onChangeText={text => handleChange('expiryDate', text)} />
        <Text style={styles.label}>Credential ID</Text>
        <TextInput style={styles.input} placeholder="Credential ID" value={form.credentialId} onChangeText={text => handleChange('credentialId', text)} />
        <Text style={styles.label}>Certificate</Text>
        <TouchableOpacity style={styles.imageUploadBox} onPress={handleCertificatePick}>
          <Text style={styles.imageUploadText}>
            {form.certificateFile ? 'Certificate Selected' : 'Upload Certificate'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Video Introduction</Text>
        <Text style={styles.label}>Video</Text>
        <TouchableOpacity style={styles.imageUploadBox} onPress={handleVideoPick}>
          <Text style={styles.imageUploadText}>
            {form.video ? 'Video Selected' : 'Upload Video'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>Video Description</Text>
        <TextInput style={styles.textArea} placeholder="Video Description" value={form.videoDescription} multiline onChangeText={text => handleChange('videoDescription', text)} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Portfolio')}>
          <Text style={styles.buttonText}>Submit</Text>
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
    padding: 20,
    paddingBottom: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
  backButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    marginRight: 10,
  },
  backButtonText: {
    color: '#3C5979',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  logoContainer: {
    
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'left',
    color: '#333',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 15,
  },
  imageUploadBox: {
    height: 150,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageUploadText: {
    color: '#555',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  previewImage: {
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
