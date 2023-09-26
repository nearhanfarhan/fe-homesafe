import { useState, useEffect, useContext } from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';
import { GeofencingEventType } from 'expo-location';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { UserContext } from "../../contexts/UserContext";
import styles from "../../styles/Homepage.styles";
import { Button } from '@rneui/base';
import { NativeModules, PermissionsAndroid } from 'react-native';

const GEOFENCING_TASK = 'GeofencingTask';
const DirectSms = NativeModules.DirectSms;

TaskManager.defineTask(GEOFENCING_TASK, ({ data: { eventType }, error }) => {
  if (error) {
    console.error('Geofencing error:', error);
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    AsyncStorage.multiGet('mobileNum', 'smsBody').then((data) => {
        const asyncMob = data[0][1];
        const asyncBody = data[1][1]
        DirectSms.sendDirectSms(asyncMob, asyncBody)
    })
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Destination reached, SMS sent, tracking stopped!",
        body: 'Tap to open the app.',
      },
      trigger: null,
    });
    Location.stopGeofencingAsync(GEOFENCING_TASK);
  }
});

export const TrackMyJourney = ({selectedContacts, selectedDestination}) => {
  const [isTracking, setIsTracking] = useState(false)

  const { currentUser } = useContext(UserContext);
  const user = currentUser?.displayName || '';

  useEffect (() => {
    AsyncStorage.setItem('mobileNum', selectedContacts[0].telNo)
  },[selectedContacts])

  useEffect (() => {
    const smsBody = `${user} has reached their destination - ${selectedDestination.identifier}`
    AsyncStorage.setItem('smsBody', smsBody)
  }, [selectedDestination])


  const smsPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS)
      .then((response) => {
        if (response === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('perms granted')
        } else {
          console.log('perms denied')
        }
      })
  }

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permission denied');
      return false;
    }
    return true;
  };

  const handleTracking = () => {
    setIsTracking(true)
    smsPermission()
    requestNotificationPermission()
    .then((data)=>{
      if (!data){
        console.log('notificaton permissions denied.')
      } else {
        Location.requestForegroundPermissionsAsync()
    .then(({ status }) => {
      console.log('foreground perms')
      if (status !== 'granted') {
        console.log('Foreground permission denied');
        return;
      }
      return Location.requestBackgroundPermissionsAsync();
    })
    .then(({ status }) => {
      console.log('background perms')
      if (status !== 'granted') {
        console.log('Background permission denied');
        return;
      }
      return Location.startGeofencingAsync(GEOFENCING_TASK, [
        selectedDestination
      ])
      .then(() => {
        Alert.alert('Tracking started.')
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
      }
    })
  };

  const handleStopTracking = () => {
    if (isTracking){
      setIsTracking(false)
     Location.stopGeofencingAsync(GEOFENCING_TASK);
     console.log('stopped')
      Alert.alert('Tracking stopped.')
    }
  }

  return (
    <>
      <Button style={styles.button} onPress={!isTracking ? handleTracking : handleStopTracking}>
        <Text style={styles.buttonText} >{!isTracking ? `Start Tracking` : `Stop Tracking`} </Text>
      </Button>
    </>
  )
};