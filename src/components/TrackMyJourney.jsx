import { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';
import { GeofencingEventType } from 'expo-location';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GEOFENCING_TASK = 'GeofencingTask';

TaskManager.defineTask(GEOFENCING_TASK, ({ data: { eventType }, error }) => {
  if (error) {
    console.error('Geofencing error:', error);
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    AsyncStorage.setItem('asyncHasArrived', 'true');
  }
});

export const TrackMyJourney = ({contactInfo, destCoords}) => {
  const [hasArrived, setHasArrived] = useState(false);
  const [startPolling, setStartPolling] = useState(false)

  const user = 'David';
  const destination = destCoords.identifier;
  const smsBody = `${user} has reached their destination - ${destination}`;

  const sendSMS = () => {
    SMS.sendSMSAsync([contactInfo], smsBody)
    .then(({ result }) => {
      if (result === 'cancelled') {
        Alert.alert('SMS not sent');
      } else {
        Alert.alert('SMS sent successfully');
      }
    });
  };

  const handleTracking = () => {
    Location.requestForegroundPermissionsAsync()
    .then(({ status }) => {
      console.log('foreground')
      if (status !== 'granted') {
        console.log('Foreground permission denied');
        return;
      }
      return Location.requestBackgroundPermissionsAsync();
    })
    .then(({ status }) => {
      console.log('location')
      if (status !== 'granted') {
        console.log('Background permission denied');
        return;
      }
      return Location.startGeofencingAsync(GEOFENCING_TASK, [
        destCoords
      ])
      .then(() => {
        setStartPolling(true)
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    if(startPolling) {
    const interval = setInterval(() => {
      AsyncStorage.getItem('asyncHasArrived')
        .then((data) => {
          console.log(1)
          if (data === 'true') {
            setHasArrived(true);
          }
        })
        .catch((error) => console.error('Error:', error));
    }, 5000)
    return () => clearInterval(interval);
    }
    
  }, [startPolling]);

  useEffect(() => {
    if (hasArrived) {
      console.log(3)
      sendSMS();
      AsyncStorage.setItem('asyncHasArrived', 'false')
      .then(()=>{
        console.log(4);
        setHasArrived(false);
      })
    }
  }, [hasArrived]);

  return (
    <>
    <TouchableOpacity onPress={handleTracking}>
      <Text>Start Tracking</Text>
    </TouchableOpacity>
    </>
  )
};

