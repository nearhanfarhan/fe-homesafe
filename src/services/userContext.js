import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

export function UserProvider(props) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser)
        })

        return () => unsubscribe();
    }, [])    




return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}
