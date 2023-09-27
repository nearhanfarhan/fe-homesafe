import { useState, useEffect, useContext } from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { GeofencingEventType } from 'expo-location';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { UserContext } from "../../contexts/UserContext";
import styles from "../../styles/Homepage.styles";
import { Button, CheckBox } from '@rneui/base';
import { NativeModules, PermissionsAndroid } from 'react-native';
import { EventEmitter } from 'events';
import { coordinatesToAddress } from '../../utils/CoordToAdd';

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
  const [messageWhenLeaving, setMessageWhenLeaving] = useState(false);
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

  useEffect(() => {
    if (isTracking && messageWhenLeaving) {
      console.log('useeffect 1')
      getCurrentLocation()
        .then((currentAddress) => {
          console.log(currentAddress)
          console.log(selectedContacts[0].telNo)
          const smsDeparted = `${user} has left from near ${currentAddress}`;
          DirectSms.sendDirectSms(selectedContacts[0].telNo, smsDeparted)
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`);
        });
    }
  }, [isTracking]);

  const getCurrentLocation = () => {
    return Location.getCurrentPositionAsync()
      .then(({ coords }) => {
        return coordinatesToAddress(coords.latitude, coords.longitude);
      })
      .catch((error) => {
        console.error(`Error getting current position: ${error.message}`);
      });
  };

  const shareCurrentLocation = () => {
    getCurrentLocation().then((currentAddress) => {
      const smsTravelling = `${user} is currently near ${currentAddress}`;
      DirectSms.sendDirectSms(selectedContacts[0].telNo, smsTravelling)
      Alert.alert('Location shared via SMS')
    });
  };

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
    if (selectedContacts.length === 0){
      Alert.alert('Please select contacts to message.');
      console.log('no contacts selected');
      return;
    }
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
      <Button
        style={styles.button}
        onPress={!isTracking ? handleTracking : handleStopTracking}
      >
        <Text style={styles.buttonText}>
          {!isTracking ? `Start Tracking` : `Stop Tracking`}
        </Text>
      </Button>
      {isTracking ? (
        <Button style={styles.button} onPress={shareCurrentLocation}>
          <Text style={styles.subButtonText}>{`Share Current Location`}</Text>
        </Button>
      ) : (
        <View style={styles.checkboxContainer}>
          <CheckBox
            center
            title="Message contacts when departing"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={messageWhenLeaving}
            onPress={() => setMessageWhenLeaving(!messageWhenLeaving)}
          />
        </View>
      )}
    </>
  );
};