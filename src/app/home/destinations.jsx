import { useState, useEffect, useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import { auth } from "../../firebase";
import DestinationList from "../../components/destinations/DestinationList";
import AddDestination from "../../components/destinations/AddDestination";
import styles from "../../styles/Destinations.styles";
import { UserContext } from "../../contexts/UserContext";
import { getUserDestinations } from "../../services/api";
import { Redirect } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../Headers/Header";

export default function destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const snapshot = await getUserDestinations(currentUser);
        if (snapshot.exists()) {
          const destinationsData = snapshot.val();
          const valuesArray = Object.keys(destinationsData).map((key) => ({
            id: key,
            ...destinationsData[key],
          }));
          setDestinations(valuesArray);  

        } else {
          setDestinations([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching destinations: ", error);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
    <Header />
      <AddDestination
        destinations={destinations}
        setDestinations={setDestinations}
      />
      <DestinationList
        destinations={destinations}
        setDestinations={setDestinations}
      />
    </ScrollView>
  );
}
