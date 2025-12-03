// CONFIG FIREBASE (bạn dán config của bạn vào đây)
const firebaseConfig = { 
  apiKey : "AIzaSyAFwEtyyNKZnCk9RavI-xDjiW4ibhZTtcE" , 
  authDomain : "yakult-scripts.firebaseapp.com" , 
  databaseURL : "https://yakult-scripts-default-rtdb.asia-southeast1.firebasedatabase.app" , 
  projectId : "yakult-scripts" , 
  storageBucket : "yakult-scripts.firebasestorage.app" , 
  messagingSenderId : "923143078416" , 
  appId : "1:923143078416:web:4c6737c18a6c5570588095" 
};

firebase.initializeApp(firebaseConfig);

// Realtime Database
const db = firebase.database();

// Cloudinary
const cloudName = "dlt8f4wan";       // <--- CLOUD NAME CỦA BẠN
const uploadPreset = "yakult_upload"; // <--- UPLOAD PRESET CỦA BẠN
