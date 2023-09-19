import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { GeofencingEventType } from 'expo-location';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as SMS from 'expo-sms';

export const TrackMyJourney = () => {
  const [hasArrived, setHasArrived] = useState(false);

  const mobileNumber = '55555555555';
  const user = 'David';
  const destination = 'Home';
  const smsBody = `${user} has reached their destination - ${destination}`;

  const sendSMS = () => {
    SMS.sendSMSAsync([mobileNumber], smsBody)
    .then(({ result }) => {
      if (result === 'cancelled') {
        Alert.alert('SMS not sent');
      } else {
        Alert.alert('SMS sent successfully');
      }
    });
  };

  TaskManager.defineTask(GEOFENCING_TASK, ({ data: { eventType }, error }) => {
    if (error) {
      console.error('Geofencing error:', error);
      return;
    }
    if (eventType === GeofencingEventType.Enter) {
      setHasArrived(true);
    }
  });

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
    .then(({ status }) => {
      if (status !== 'granted') {
        console.log('Foreground permission denied');
        return;
      }
      return Location.requestBackgroundPermissionsAsync();
    })
    .then(({ status }) => {
      if (status !== 'granted') {
        console.log('Background permission denied');
        return;
      }
      return Location.startGeofencingAsync(GEOFENCING_TASK, [
        { identifier: 'home', latitude: 51.468100, longitude: -0.187800, radius: 5000 }
      ]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  useEffect(() => {
    if (hasArrived) {
      sendSMS();
      setHasArrived(false);
    }
  }, [hasArrived]);

  return hasArrived;
};