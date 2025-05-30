import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

interface SectionProps {
  title: string;
  items: string[];
}

const PortfolioScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <Text style={styles.name}>John D.</Text>
        <Text style={styles.title}>UX / UI Designer</Text>
        <Text style={styles.subTitle}>Front End Developer / No Code Builder</Text>
        <Text style={styles.verified}>Profile Verified 100%</Text>
        <TextInput
          style={styles.linkBox}
          value="https://www.mytrustworld.com/john-d-98711379/"
          editable={false}
        />
      </View>
      <View style={styles.separator} />

      {/* Tags Section */}
      <Section title="Services" items={['3D Design', 'Animation', 'Brand Design', 'UX Research']} />
      
      <View style={styles.separator} />

      <Section title="Skills" items={['Wireframing', 'Web Design', 'UX Research', 'HTML/CSS']} />
     
      <View style={styles.separator} />

      <Section title="Tools" items={['Figma', 'Photoshop', 'After Effects']} />

      <View style={styles.separator} />

      {/* Education */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.itemTitle}>Harvard University</Text>
        <Text style={styles.itemSubtitle}>CS50 (Computer Science)</Text>
        <Text style={styles.itemDate}>2022–2024</Text>
      </View>
       
      <View style={styles.separator} />

      {/* Certifications */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Licenses / Certifications</Text>
        <Text style={styles.itemTitle}>Google UX / UI Certificate</Text>
        <Text style={styles.itemDate}>2022–2024</Text>
      </View>


      <View style={styles.separator} />


      {/* Experience */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text style={styles.itemTitle}>WEB4 PTY LTD</Text>
        <Text style={styles.itemSubtitle}>UX / UI Designer, Senior Graphic Designer</Text>
        <Text style={styles.itemLocation}>Queensland, Australia</Text>
        <Text style={styles.itemDate}>July 2022 – Present</Text>
      </View>
        
      <View style={styles.separator} />

      {/* Star Rating */}
      <View style={styles.ratingBox}>
        <Text style={styles.rating}>⭐ 5</Text>
        <Text style={styles.ratingLabel}>Exceptional</Text>
        <Text style={styles.ratingDetails}>50 Reviews</Text>
        {/* Add star bar if needed */}
      </View>
    </ScrollView>
  );
};

// Reusable section for tags
const Section = ({ title, items }: SectionProps) => (
  <View style={styles.block}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.pills}>
      {items.map((item, index) => (
        <Text key={index} style={styles.pill}>{item}</Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    marginTop: 4,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
  },
  verified: {
    marginTop: 8,
    color: 'green',
    fontWeight: 'bold',
  },
  linkBox: {
    marginTop: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    width: '90%',
  },
  block: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#444',
  },
  itemDate: {
    fontSize: 13,
    color: '#888',
  },
  itemLocation: {
    fontSize: 14,
    color: '#555',
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 13,
    margin: 4,
  },
  ratingBox: {
    alignItems: 'center',
    padding: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingLabel: {
    fontSize: 16,
    color: 'gold',
    marginTop: 4,
  },
  ratingDetails: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
});

export default PortfolioScreen;
