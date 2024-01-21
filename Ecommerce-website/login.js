import { signInWithEmailAndPassword ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#loginBtn');



onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      window.location = "home.html"
      // ...
    } else {
      // User is signed out
      // ...
    }
  });


function load() {
    loginBtn.innerHTML = `<div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>`
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    load()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = 'home.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // console.log(errorCode);
            // const errSplice = errorCode
            alert(errorCode)
            loginBtn.innerHTML = `Login`
        });

})




