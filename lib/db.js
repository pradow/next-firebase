import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

export async function createUser(uid, data) {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
