// Root Layout
// you can use the Root Layout (app/_layout.js) to add providers which can be accessed by any route in the app.
// https://docs.expo.dev/router/advanced/root-layout/

import { Slot } from 'expo-router';
import { ThemeProvider, createTheme } from '@rneui/themed';
import Header from '../components/Header';
import { UserProvider } from '../contexts/UserContext';
import { ContactProvider } from '../contexts/ContactContext';

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});

export default function RootLayout() {
  return (
    <UserProvider>
      <ContactProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Slot />
        </ThemeProvider>
      </ContactProvider>
    </UserProvider>
  );
}