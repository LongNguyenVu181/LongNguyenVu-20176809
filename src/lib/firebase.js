import firebase from 'firebase';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBTWoslsF6dfG4809Ob-7dm8yoLbwyuugg",
    authDomain: "fir-sample-4e357.firebaseapp.com",
    projectId: "fir-sample-4e357",
    storageBucket: "fir-sample-4e357.appspot.com",
    messagingSenderId: "454089008987",
    appId: "1:454089008987:web:d4aee10aa85574993e9c7e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};