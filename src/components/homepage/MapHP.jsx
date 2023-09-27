import { useEffect } from "react";
import { Text, StyleSheet } from "react-native"
import MapView, { Marker, Callout } from 'react-native-maps';

export default function MapHP({selectedDestination, setSelectedDestination}) {
    // this needs setting to the actual location
    const initialRegion = {
        latitude: 53.78825,
        longitude: -2.4324,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0421,
    };

    return (
        <MapView style={styles.map}
            initialRegion={initialRegion}
            region={{
                ...initialRegion,
                ...selectedDestination
            }}
            >
                {selectedDestination ? (
                <Marker
                    draggable
                    coordinate={{
                        longitude: selectedDestination.longitude,
                        latitude: selectedDestination.latitude
                    }}
                    onDragEnd={(e) => { 
                        // console.log("drag: " + e.nativeEvent.coordinate);
                        setSelectedDestination({ ...selectedDestination, ...e.nativeEvent.coordinate });
                    }}
                >
                    <Callout>
                        <Text>Selected Destination</Text>
                    </Callout>
                </Marker> ) : ( <></>)}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "60%"
    }
});