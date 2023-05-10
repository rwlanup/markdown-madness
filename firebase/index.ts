import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';

const initializedApps = getApps();
const firebaseApp = initializedApps.length === 0 ? initializeApp(firebaseConfig) : initializedApps[0];

export const firestore = getFirestore(firebaseApp);
export default firebaseApp;
