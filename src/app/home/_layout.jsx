// Root Layout
// you can use the Root Layout (app/_layout.js) to add providers which can be accessed by any route in the app.
// https://docs.expo.dev/router/advanced/root-layout/

import { Tabs } from 'expo-router/tabs';

export default function AppLayout() {
    return (
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              href: "/home",
            }}
          />
          <Tabs.Screen
            name="contacts"
            options={{
              href: "/home/contacts",
            }}
          />
        </Tabs>
      );
}