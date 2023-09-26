import { Text, StyleSheet } from "react-native"
import MapView, { Marker, Callout, Circle } from 'react-native-maps';

export default function MapHP({selectedDestination, setSelectedDestination}) {
    // this needs setting to the actual location
    const initialRegion = {
        latitude: 53.78825,
        longitude: -2.4324,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0421,
    };

    const defaultRadius = 100;

    return (
        <MapView style={styles.map}
            initialRegion={initialRegion}
            region={{
                ...initialRegion,
                ...selectedDestination
            }}
            >
                {selectedDestination ? (
                    <>
                        <Marker
                            draggable
                            coordinate={{
                                longitude: selectedDestination.longitude,
                                latitude: selectedDestination.latitude
                            }}
                            onDragEnd={(e) => { 
                                console.log("drag:", JSON.stringify(e.nativeEvent.coordinate));
                                setSelectedDestination({ ...selectedDestination, ...e.nativeEvent.coordinate });
                            }}
                        >
                            <Callout>
                                <Text>Selected Destination</Text>
                            </Callout>
                        </Marker>
                        <Circle
                        center={{
                            latitude: selectedDestination.latitude,
                            longitude: selectedDestination.longitude,
                        }}
                        radius={defaultRadius} // Set the radius (in meters)
                        fillColor="rgba(0, 128, 255, 0.2)" // Fill color of the circle
                        strokeColor="rgba(0, 0, 255, 0.5)" // Stroke color of the circle
                        />
                    </>
             ) : ( <></>)}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "65%"
    }
});