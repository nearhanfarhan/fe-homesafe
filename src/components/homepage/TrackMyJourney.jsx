import { useState, useEffect, useContext } from "react";
import { Alert, TouchableOpacity, Text, View } from "react-native";
import { GeofencingEventType } from "expo-location";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as SMS from "expo-sms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { UserContext } from "../../contexts/UserContext";
import styles from "../../styles/Homepage.styles";
import { Button, CheckBox } from "@rneui/base";
import * as Permissions from "expo-permissions";
import { coordinatesToAddress } from "../../utils/CoordToAdd";

const GEOFENCING_TASK = "GeofencingTask";

TaskManager.defineTask(GEOFENCING_TASK, ({ data: { eventType }, error }) => {
  if (error) {
    console.error("Geofencing error:", error);
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    AsyncStorage.setItem("asyncHasArrived", "true");
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You've reached you're destination!",
        body: "Tap to open the app.",
      },
      trigger: null,
    });
  }
});

export const TrackMyJourney = ({ selectedContacts, selectedDestination }) => {
  const [hasArrived, setHasArrived] = useState(false);
  const [startPolling, setStartPolling] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [messageWhenLeaving, setMessageWhenLeaving] = useState(false);

  const { currentUser } = useContext(UserContext);

  const user = currentUser?.displayName || "";
  const destination = selectedDestination.identifier;
  const smsArrived = `${user} has reached their destination - ${destination}`;

  const sendSMS = (smsType) => {
    SMS.sendSMSAsync(
      selectedContacts.map((contact) => contact.telNo),
      smsType
    ).then(({ result }) => {
      if (result === "cancelled") {
        Alert.alert("SMS not sent");
      } else {
        Alert.alert("SMS sent successfully");
      }
    });
  };

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Notification permission denied");
      return false;
    }
    return true;
  };

  const handleTracking = () => {
    setIsTracking(true);
    requestNotificationPermission().then((data) => {
      if (!data) {
        console.log("notificaton permissions denied.");
      } else {
        Location.requestForegroundPermissionsAsync()
          .then(({ status }) => {
            console.log("foreground");
            if (status !== "granted") {
              console.log("Foreground permission denied");
              return;
            }
            return Location.requestBackgroundPermissionsAsync();
          })
          .then(({ status }) => {
            console.log("location");
            if (status !== "granted") {
              console.log("Background permission denied");
              return;
            }
            return Location.startGeofencingAsync(GEOFENCING_TASK, [
              selectedDestination,
            ]).then(() => {
              setStartPolling(true);
              Alert.alert("Tracking started.");
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  const handleStopTracking = () => {
    if (startPolling) {
      setIsTracking(false);
      setStartPolling(false);
      Location.stopGeofencingAsync(GEOFENCING_TASK);
      Alert.alert("Tracking stopped.");
    }
  };

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
      sendSMS(smsTravelling);
    });
  };

  
  useEffect(() => {
    if (startPolling && messageWhenLeaving) {
      getCurrentLocation()
        .then((currentAddress) => {
          const smsDeparted = `${user} has left from near ${currentAddress}`;
          sendSMS(smsDeparted);
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`);
        });
    }
  }, [startPolling]);

  useEffect(() => {
    if (startPolling) {
      const interval = setInterval(() => {
        AsyncStorage.getItem("asyncHasArrived")
          .then((data) => {
            console.log(1);
            if (data === "true") {
              setHasArrived(true);
              setStartPolling(false);
            }
          })
          .catch((error) => console.error("Error:", error));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [startPolling]);

  useEffect(() => {
    if (hasArrived) {
      Location.stopGeofencingAsync(GEOFENCING_TASK);
      console.log(3);
      sendSMS(smsArrived);
      AsyncStorage.setItem("asyncHasArrived", "false").then(() => {
        console.log(4);
        setHasArrived(false);
        setIsTracking(false);
      });
    }
  }, [hasArrived]);

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
