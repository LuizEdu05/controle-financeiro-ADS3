import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiM_IoGeuF0O0S-gvvdclhlANny7u632A",
  authDomain: "projeto-controle-finance-36bf5.firebaseapp.com",
  projectId: "projeto-controle-finance-36bf5",
  storageBucket: "projeto-controle-finance-36bf5.firebasestorage.app",
  messagingSenderId: "817064045927",
  appId: "1:817064045927:web:a47a4b4874d6207df393c2",
  measurementId: "G-TZJ52H1JDS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
