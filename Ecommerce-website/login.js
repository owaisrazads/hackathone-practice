import {  signInWithEmailAndPassword, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./config.js"


// console.log('Hello Worker');


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      window.location = 'home.html'
      // ...
    } else {
    alert(errorMessage)
    }
  });

const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')


form.addEventListener('submit', (event)=>{
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      window.location = "home.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    //   <span class="loading loading-ring loading-md"></span>

    });
})