import { View, ScrollView, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { auth } from "../../firebase";
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
// import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import styles from "../../styles/Homepage.styles";
import HomepageButtons from "../../components/homepage/HomepageButtons";
import MapHP from "../../components/homepage/MapHP";
import PickerHP from "../../components/homepage/PickerHP";
import CurrentLocation from "../../components/homepage/CurrentLocation";

export default function HomePage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        router.replace("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

      const router = useRouter();
      if (!auth.currentUser) {
          return <Redirect href="/login" />;
        }
  
        return (
        <ScrollView style={styles.container}>
      <PickerHP />
       <MapHP />
       <HomepageButtons />
        <View style={styles.extraSpace}></View>
      </ScrollView>
  )}
      