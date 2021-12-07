import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

export function createUser(uid, data) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...data
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
