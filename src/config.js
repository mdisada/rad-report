import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOFH7iLVDeSR_UDbYDAcgSA4jBHHVvR6c",
    authDomain: "myradreport-f9db4.firebaseapp.com",
    projectId: "myradreport-f9db4",
    storageBucket: "myradreport-f9db4.appspot.com",
    messagingSenderId: "713006202828",
    appId: "1:713006202828:web:adc37fb54dffb9ed912769",
    measurementId: "G-S952JWDVKF"
  };

initializeApp(firebaseConfig);

const db = getFirestore();

export default db