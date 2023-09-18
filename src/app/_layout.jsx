// Root Layout
// you can use the Root Layout (app/_layout.js) to add providers which can be accessed by any route in the app.
// https://docs.expo.dev/router/advanced/root-layout/

import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <>
        <Slot />
    </>
  );
}