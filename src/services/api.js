import {getDatabase, ref, set, get, child, update, remove} from "firebase/database"

const database=getDatabase()

export const postUserOnRegistration = (userCredential) => {
    const user = userCredential.user;
    const uid = user.uid
    set(ref(database, `users/${uid}`), {email: user.email})
}

export const getUserById = (userCredential) => {
    const user = userCredential.user;
    // console.log("in function", user.uid)
    return get(child(ref(database), `users/${user.uid}`))
}

export const addContact = (userCredential) => {
    const user = userCredential.user;
    const uid = user.uid
    return update(ref(database, `users/${uid}/contacts`), {name: "mum", number: "07805443654"})
}