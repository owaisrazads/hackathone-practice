import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { auth, } from './config.js';
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js'  db, storage 

const form = document.querySelector('#form');
const names = document.querySelector('#names');
const email = document.querySelector('#email');
const img = document.querySelector('#img');
const password = document.querySelector('#password');
const register = document.querySelector('#register');







form.addEventListener('submit', (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email.value, password.value, names.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = 'login.html'
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });

});





