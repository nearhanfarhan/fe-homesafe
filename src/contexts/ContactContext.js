import { createContext, useState } from "react";

export const ContactContext = createContext();

export function ContactProvider(props) {
  const [contacts, setContacts] = useState([]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {props.children}
    </ContactContext.Provider>
  );
}
