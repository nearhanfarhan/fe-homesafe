
import { useContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { auth } from "../../firebase";
import styles from "../../styles/Homepage.styles";
import MapHP from "../../components/homepage/MapHP";
import SearchLocation from "../../components/homepage/SearchLocation";
import { TrackMyJourney } from "../../components/homepage/TrackMyJourney";
import SearchContacts from "../../components/homepage/SearchContacts";
import { View, FlatList, SafeAreaView } from "react-native";
import RadiusSelector from "../../components/homepage/RadiusSelector";
import HomepageHeader from "../../Headers/HomePageHeader";


export default function HomePage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }
  const [selectedDestination, setSelectedDestination] = useState({ identifier: 'home', latitude: 51.468100, longitude: -0.187800, radius: 150, });
  const [selectedRadius, setSelectedRadius] = useState({size: 'medium', radius: 150});
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  
  const data = [null];

  return (
    <SafeAreaView>
      <HomepageHeader />
      <View>
        <SearchLocation
          placeholder="Where are you going?"
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
          query={query}
          setQuery={setQuery}
          locations={locations}
          setLocations={setLocations}
        />
        <SearchContacts setSelectedContacts={setSelectedContacts} />
        <RadiusSelector selectedRadius={selectedRadius} setSelectedRadius={setSelectedRadius} selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination}/>
        <MapHP
          selectedRadius={selectedRadius}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
        />
        <TrackMyJourney
          selectedContacts={selectedContacts}
          selectedDestination={selectedDestination}
        />
      </View>
    </SafeAreaView>
  );
}
