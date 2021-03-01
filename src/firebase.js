// import * as firebase from "firebase";
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAnAi8Dat4JyD9dLlCvWQYZNS4tE7Od92w",
    authDomain: "nba-demo-app.firebaseapp.com",
    databaseURL: "https://nba-demo-app-default-rtdb.firebaseio.com",
    projectId: "nba-demo-app",
    storageBucket: "nba-demo-app.appspot.com",
    messagingSenderId: "84960266708",
    appId: "1:84960266708:web:09ca416f150a611233ee41",
    measurementId: "G-1HCZR75RV5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

  const firebaseDB = firebase.database();
  const firebaseArticles = firebaseDB.ref('articles');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebaseVideos = firebaseDB.ref('videos');

  const firebaseLooper =(snapshot) => {
    const data= []; 
    snapshot.forEach(chlidSnapshot => {
        data.push({
            ...chlidSnapshot.val(),
            id:chlidSnapshot.key
        });
    }); 
    return data
  }
  export {
      firebase,
      firebaseDB,
      firebaseTeams,
      firebaseArticles,
      firebaseVideos,
      firebaseLooper
  }