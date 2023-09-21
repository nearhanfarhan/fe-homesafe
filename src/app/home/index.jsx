import { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Redirect } from "expo-router";
import { auth } from "../../firebase";
import styles from "../../styles/Homepage.styles";
import StartStopTracking from "../../components/homepage/StartStopTracking";
import MapHP from "../../components/homepage/MapHP";
import SearchLocation from "../../components/homepage/SearchLocation";
import CurrentLocation from "../../components/homepage/CurrentLocation";

export default function HomePage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchLocation 
        selectedDestination={selectedDestination} 
        setSelectedDestination={setSelectedDestination}
        query={query}
        setQuery={setQuery}
        locations={locations}
        setLocations={setLocations} />
      <MapHP selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
      <StartStopTracking selectedDestination={selectedDestination} />
    </SafeAreaView>
  )
}
      