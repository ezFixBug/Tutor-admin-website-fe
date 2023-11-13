import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, child, get, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY_FIREBASE,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN_FIREBASE,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL_FIREBASE,
  projectId: import.meta.env.VITE_APP_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET_FIREBASE,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGESENDER_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_APP_ID_FIREBASE,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database, ref, push, onValue, child, get, set };
import.meta.env.VITE_APP_API_URL