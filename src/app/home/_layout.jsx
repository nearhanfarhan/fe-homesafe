// Root Layout
// you can use the Root Layout (app/_layout.js) to add providers which can be accessed by any route in the app.
// https://docs.expo.dev/router/advanced/root-layout/

import { Slot, Tabs } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { auth } from '../../firebase';
import { UserContext } from '../../services/userContext';
import { useContext } from 'react';

export default function AppLayout() {

  const {currentUser} = useContext(UserContext)

    return (
        <>
          <Tabs screenOptions={{ headerShown: true }}>
            <Tabs.Screen
              name="index"
              options={{
                href: "/home",
                tabBarLabel: "Home",
                headerTitle: `Welcome ${currentUser?.displayName}`,
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
                headerTitle: "Contacts",
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
                href: null,
                headerTitle: `Profile`
              }}
            />
          </Tabs>
        </>
      );
}