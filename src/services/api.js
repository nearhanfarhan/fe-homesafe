import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from "firebase/database";

const database = getDatabase();

export const postUserOnRegistration = (user) => {
  set(ref(database, `users/${user.uid}`), {
    email: user.email,
    name: user.displayName,
  });
};

export const getUserById = (userCredential) => {
  const user = userCredential.user;
  return get(child(ref(database), `users/${user.uid}`));
};

export const addContact = (userCredential) => {
  const user = userCredential.user;
  const uid = user.uid;
  return update(ref(database, `users/${uid}/contacts`), {
    name: "mum",
    number: "07805443654",
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
