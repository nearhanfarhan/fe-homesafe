import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  push,
  remove,
} from "firebase/database";

const database = getDatabase();

export const postUserOnRegistration = (user) => {
  const uid = user.uid;
  set(ref(database, `users/${uid}`), {
    email: user.email,
    name: user.displayName,
  });
};

export const getUserContacts = (user) => {
  const uid = user.uid;
  return get(child(ref(database), `users/${uid}/contacts`));
};

export const addContactToUser = (user, contact) => {
  const uid = user.uid;
  return set(push(ref(database, `users/${uid}/contacts`)), {
    name: contact.name,
    telNo: contact.telNo,
  });
};

export const removeContactFromUser = (user, contact_id) => {
  const uid = user.uid;
  return remove(ref(database, `users/${uid}/contacts/${contact_id}`));
};

export const returnUpdatedContactList = (user, setContacts) => {
  return getUserContacts(user).then((snapshot) => {
    if (snapshot.exists()) {
      const contactsData = snapshot.val();
      const valuesArray = Object.keys(contactsData).map((key) => ({
        id: key,
        ...contactsData[key],
      }));
      setContacts(valuesArray);
    } else {
      setContacts([]);
    }
  });
};


export const searchLocations = (query) => {
  // need api to search location
  const locations = [
    {
      identifier: "home",
      latitude: 51.4681,
      longitude: -0.1878,
      radius: 5000,
    },
    {
      identifier: "manchester",
      latitude: 53.4722,
      longitude: -2.2917,
      radius: 5000,
    },
    {
      identifier: "work",
      latitude: 51.5681,
      longitude: -0.1878,
      radius: 5000,
    },
    {
      identifier: "school",
      latitude: 51.4781,
      longitude: -0.1878,
      radius: 5000,
    },
    {
      identifier: "birmingham",
      latitude: 52.4845,
      longitude: -1.8792,
      radius: 5000,
    },
  ];
  return locations.filter((location) =>
    location.identifier.includes(query.toLowerCase())
  );
};

/* not currently being used
export const getUserById = (userCredential) => {
  const user = userCredential.user;
  return get(child(ref(database), `users/${user.uid}`));
};
*/

