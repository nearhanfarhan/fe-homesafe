import * as SecureStore from 'expo-secure-store'

const storeFirebaseAuthToken = async (token) => {
  try {
    await SecureStore.setItemAsync('firebaseAuthToken', token);
    } catch (error) {
    console.error("Error storing Firebase token:", error);
  }
};

const retrieveFirebaseAuthToken = async () => {
  try {
    const credentials = await SecureStore.getItemAsync('firebaseAuthToken')
    if (credentials) {
      return credentials.password;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving Firebase token:", error);
    return null;
  }
};

export { storeFirebaseAuthToken, retrieveFirebaseAuthToken };
