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

/* not currently being used
export const getUserById = (userCredential) => {
  const user = userCredential.user;
  return get(child(ref(database), `users/${user.uid}`));
};
*/
