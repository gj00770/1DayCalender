
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider,browserSessionPersistence } from "firebase/auth"



  const firebaseConfig = { 
      // apikey:process.env.REACT_APP_API_KEY, 
      // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      //  projectId: process.env.REACT_APP_PROJECT_ID, 
      //  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, 
      //  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID, 
      //  appID: process.env.REACT_APP_APP_ID,
      //  measurementId: process.env.REACT_APP_APP_MEASUREMENT_ID,
  apiKey: "AIzaSyDA1tn-aVKRrcCZMCrT4KkskDfiXc429aI",
  authDomain: "daycal2-beca8.firebaseapp.com",
  projectId: "daycal2-beca8",
  storageBucket: "daycal2-beca8.appspot.com",
  messagingSenderId: "812744344630",
  appId: "1:812744344630:web:3640dff06a0ad0bc6a8497",
  measurementId: "G-DJM9R6JGVD"
     }; 
     let firebaseApp;
     const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const db = getFirestore(app,{})
      const auth = getAuth(app)

      console.log('auth',auth)
      if(auth && auth.currentUser){

      }
 //     else{


    //   setPersistence(auth, browserSessionPersistence)
    //   .then(() => {
    //     const provider = new GoogleAuthProvider();
    //     // In memory persistence will be applied to the signed in Google user
    //     // even though the persistence was set to 'none' and a page redirect
    //     // occurred.
    //    // return signInWithRedirect(auth, provider);
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
    
    // }




      var uiConfig = {
     
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         
        ],
        
        };

        const ui = new firebaseui.auth.AuthUI(auth);
        // The start method will wait until the DOM is loaded.
       





      export { db, firebaseui,app,ui,uiConfig, auth}
     export default firebaseConfig;
    