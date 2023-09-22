import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Redirect } from "expo-router";
import { auth } from "../../firebase";
import styles from "../../styles/Homepage.styles";
import MapHP from "../../components/homepage/MapHP";
import SearchLocation from "../../components/homepage/SearchLocation";
import CurrentLocation from "../../components/homepage/CurrentLocation";
import { TrackMyJourney } from "../../components/homepage/TrackMyJourney";
import SearchContacts from "../../components/homepage/SearchContacts";

export default function HomePage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }
  const [selectedDestination, setSelectedDestination] = useState({ identifier: 'home', latitude: 51.468100, longitude: -0.187800, radius: 5000, });
  const [selectedContact, setSelectedContact] = useState('07301234567')
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
    <SearchContacts />
      <SearchLocation 
        selectedDestination={selectedDestination} 
        setSelectedDestination={setSelectedDestination}
        query={query}
        setQuery={setQuery}
        locations={locations}
        setLocations={setLocations} />
      <SearchContacts />
      <MapHP selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
      <TrackMyJourney selectedContact={selectedContact} selectedDestination={selectedDestination}/>

    </SafeAreaView>
  )
}
      