// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlxbIlrwJCJoSpp5k7g6LhVR8ZzjjyOfg",
  authDomain: "webdesign-f3b50.firebaseapp.com",
  projectId: "webdesign-f3b50",
  storageBucket: "webdesign-f3b50.firebasestorage.app",
  messagingSenderId: "976095737861",
  appId: "1:976095737861:web:fc3998d35052139766c46c",
  measurementId: "G-8WZB0W8PMB",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Reference the form
const contactForm = document.getElementById("contactForm");

// Listen for form submissions
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  // Collect form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validate data (optional)
  if (!name || !email || !message) {
    alert("All fields are required!");
    return;
  }

  // Save data to Firestore
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
      timestamp: new Date(),
    });

    console.log("Document written with ID: ", docRef.id);
    document.getElementById("status").innerText = "Message sent successfully!";
    contactForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    document.getElementById("status").innerText =
      "Failed to send message. Try again.";
  }
});
