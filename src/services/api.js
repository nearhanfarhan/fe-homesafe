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
  })
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
