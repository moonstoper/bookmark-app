import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import TopBar from '../components/TopBar';
import { ScrollView } from 'react-native-gesture-handler';

const AboutScreen = () => {
  const openGitHubLink = () => {
    Linking.openURL('https://github.com/moonstoper/bookmark-app');
  };

  return (
    <View>
        <TopBar headerName='About Bookmark'></TopBar>
  
    <ScrollView style={styles.container}>
      <Text>Welcome to Suraj's Bookmarker, a passion project born out of the curiosity and enthusiasm of Suraj Kachhap, a Computer Science graduate. This application is the result of a journey into the world of React Native, designed to be a one-stop solution for managing all your web bookmarks.</Text>

      <View style={styles.featuresContainer}>
        <Text style={styles.feature}>- Effortless Bookmarking</Text>
        {/* <Text style={styles.feature}>- Organize with Ease</Text> */}
        <Text style={styles.feature}>- Sync Across Devices</Text>
      </View>

      {/* <Text style={styles.subHeading}>Suraj's Learning Journey</Text>
      <Text>Suraj Kachhap, the mind behind this application, embarked on a mission to deepen his understanding of React Native. The result is an intuitive, user-friendly app designed to simplify the way you save and revisit your web bookmarks.</Text> */}

      <Text style={styles.subHeading}>Why Bookmark?</Text>
      <Text>1. User-Focused Design: Bookmark is crafted with the user in mind, ensuring a smooth and enjoyable experience.</Text>
      <Text>2. Continuous Improvement: As a side project, this app is a testament to Suraj's commitment to learning and improving his skills.</Text>
      <Text>3. Your Personal Bookmark Hub: Make Bookmarker your go-to platform for effortlessly managing all your web bookmarks.</Text>

      <TouchableOpacity onPress={openGitHubLink} style={styles.githubLinkContainer}>
        <Text style={styles.githubLinkText}>View on GitHub</Text>
      </TouchableOpacity>

      {/* Add your app logo image here */}
      <Image source={require('../images/logo.png')} style={styles.logo} />
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  featuresContainer: {
    marginVertical: 10,
  },
  feature: {
    marginVertical: 5,
  },
  githubLinkContainer: {
    backgroundColor: '#0366d6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  githubLinkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
//   Add your logo styling here
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default AboutScreen;
