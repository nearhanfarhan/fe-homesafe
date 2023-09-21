import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { auth } from '../../firebase';
import DestinationList from '../../components/destinations/DestinationList';
import AddDestination from '../../components/destinations/AddDestination';
import styles from '../../styles/Destinations.styles';

export default function destinations() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }

  // load destinations from backend

  const [destinations, setDestinations] = useState([]);

  return (
    <SafeAreaView>
      <DestinationList destinations={destinations} setDestinations={setDestinations} />
      <AddDestination destinations={destinations} setDestinations={setDestinations} />
    </SafeAreaView>
  );
}
