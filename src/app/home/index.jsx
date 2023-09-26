import { useState } from "react";
import {View, FlatList } from "react-native";
import { Redirect } from "expo-router";
import { auth } from "../../firebase";
import styles from "../../styles/Homepage.styles";
import MapHP from "../../components/homepage/MapHP";
import SearchLocation from "../../components/homepage/SearchLocation";
import { TrackMyJourney } from "../../components/homepage/TrackMyJourney";
import SearchContacts from "../../components/homepage/SearchContacts";
import HomepageHeader from '../../Headers/HomePageHeader'

export default function HomePage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }
  const [selectedDestination, setSelectedDestination] = useState({ identifier: 'home', latitude: 51.468100, longitude: -0.187800, radius: 5000, });
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  
  const data = [null];
return(
      <FlatList
      data={data}
      renderItem={({ item }) => (
        <View>
          <HomepageHeader />
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
          <MapHP selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
          <TrackMyJourney selectedContacts={selectedContacts} selectedDestination={selectedDestination} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}






      