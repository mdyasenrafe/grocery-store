import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const firebaseInitAuth = () => {
  return initializeApp(firebaseConfig);
};

export default firebaseInitAuth;
