import { StyleSheet, View } from "react-native";
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from 'expo-router';

const goToProfile = () => {
    router.replace('/home/profile');
}

const LoginHeader = () => {
    return (
        <HeaderRNE backgroundColor="#397af8"

            centerComponent={{ text: 'SafeTrakr', style: styles.heading }}
        />
    );
};

const styles = StyleSheet.create({
    heading: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
    headerRight: {
      display: 'flex',
      flexDirection: 'row'
    }
    });

export default LoginHeader;