import { View, Text, ImageBackground } from "react-native"
import styles from "../../styles/Homepage.styles"

export default function MapHP() {
    return (
        <ImageBackground source={require("../../assets/map-placeholder.jpeg")} resizeMode="cover" style={styles.mapPlaceholder}>
            <Text>Map Placeholder</Text>
        </ImageBackground>
    )
}