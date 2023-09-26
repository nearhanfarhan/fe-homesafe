import { useState, useEffect, useContext } from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';
import { GeofencingEventType } from 'expo-location';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { UserContext } from "../../contexts/UserContext";
import styles from "../../styles/Homepage.styles";
import { Button } from '@rneui/base';
import { NativeModules, PermissionsAndroid } from 'react-native';
import { EventEmitter } from 'events';

const GEOFENCING_TASK = 'GeofencingTask';
const DirectSms = NativeModules.DirectSms;
const trackingEvents = new EventEmitter();

TaskManager.defineTask(GEOFENCING_TASK, ({ data: { eventType }, error }) => {
  if (error) {
    console.error('Geofencing error:', error);
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    AsyncStorage.multiGet(['mobileNum', 'smsBody']).then((data) => {
        const asyncMob = data[0][1];
        const asyncBody = data[1][1]
        DirectSms.sendDirectSms(asyncMob, asyncBody)
    })
    Alert.alert('Destination reached, SMS sent')
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Destination reached, SMS sent, tracking stopped!",
        body: 'Tap to open the app.',
      },
      trigger: null,
    });
    Location.stopGeofencingAsync(GEOFENCING_TASK);
    trackingEvents.emit('trackingStatusChanged', true)
    console.log('tracking stopped')
  }
});

export const TrackMyJourney = ({selectedContacts, selectedDestination}) => {
  const [isTracking, setIsTracking] = useState(false)
  const { currentUser } = useContext(UserContext);
  const user = currentUser?.displayName || '';

  useEffect (() => {
    if (selectedContacts && selectedContacts.length > 0)
    AsyncStorage.setItem('mobileNum', selectedContacts[0].telNo)
  },[selectedContacts])

  useEffect (() => {
    const smsBody = `${user} has reached their destination - ${selectedDestination.address}`
    AsyncStorage.setItem('smsBody', smsBody)
  }, [selectedDestination])

  useEffect (() => {
    const handleTrackingChange = (newStatus) => {
      if(newStatus) {
        setIsTracking(false)
      }
    }
    trackingEvents.on('trackingStatusChanged', handleTrackingChange)
    
    return () => {
      trackingEvents.off('trackingStatusChanged', handleTrackingChange);
    };
  }, [isTracking])


  const smsPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS)
      .then((response) => {
        if (response === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification perms')
        } else {
          console.log('perms denied')
        }
      })
  }

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }
    return true;
  };

  useEffect (() => {
    smsPermission()
    .then(() => {
     return requestNotificationPermission()
    })
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
    })
   }
 })
}, [])

  const handleTracking = () => {
    setIsTracking(true)
    
      return Location.startGeofencingAsync(GEOFENCING_TASK, [
        selectedDestination
      ])
      .then(() => {
        Alert.alert('Tracking started.')
        console.log('tracking started')
      })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  const handleStopTracking = () => {
    if (isTracking){
      setIsTracking(false)
     Location.stopGeofencingAsync(GEOFENCING_TASK)
     .then(() => {
      console.log('handle-stopped')
      Alert.alert('Tracking stopped.')  
     })
     .catch(err => {
      console.log('error stopping geofencing')
     })
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