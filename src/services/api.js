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
  set(ref(database, `users/${user.uid}`), {
    email: user.email,
    name: user.displayName,
  })
};

export const getUserById = (userCredential) => {
  const user = userCredential.user;
  return get(child(ref(database), `users/${user.uid}`));
};

export const addContactToUser = (user, contact) => {
  const uid = user.uid;
  return set(push(ref(database, `users/${uid}/contacts`)), {name: contact.name, telNo: contact.telNo});
};
