// Root Layout
// you can use the Root Layout (app/_layout.js) to add providers which can be accessed by any route in the app.
// https://docs.expo.dev/router/advanced/root-layout/

import { Slot, Tabs } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AppLayout() {
    return (
        <Tabs  screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="index"
            options={{
              href: "/home",
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="home"
                  color={color}
                />
              )
            }}
          />
          <Tabs.Screen
            name="contacts"
            options={{
              href: "/home/contacts",
              tabBarLabel: "Contacts",
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="users"
                  color={color}
                />
              )
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              href: null
            }}
          />
        </Tabs>
      );
}