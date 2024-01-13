import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db, storage } from "./config.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'


const form = document.querySelector('#form');
const img = document.querySelector('#img');
const firstName = document.querySelector('#names');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeatPassword');
const modalMessage = document.querySelector('#modal-message');



form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (password.value !== repeatPassword.value) {
        console.log('password are not same');
        modalMessage.innerHTML = 'password is not same here'
        my_modal_1.showModal()
        return
    }
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const file = img.files[0]
        const storageRef = ref(storage, email.value);
        uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef).then((url) => {
                addDoc(collection(db, "user"), {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    uid: user.uid,
                    profileUrl: url
                }).then((res) => {
                    console.log(res);
                    window.location = 'login.html'
                }).catch((err) => {
                    console.log(err);
                })
            })
        });

    })
    .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });


}); 