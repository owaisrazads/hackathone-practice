// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// import { auth, db } from "./config.js";
// import { collection, getDocs, where, query} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



// const form = document.querySelector('#form');
// const profileImage = document.querySelector('#profileImage');
// const username = document.querySelector('#username');
// const logout = document.querySelector('#logout');
// const submit = document.querySelector('#submit');

// async function getDataFromFirestore() {
//     const querySnapshot = await getDocs(collection(db, "todo"));
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//     })};
//     getDataFromFirestore()

// logout.addEventListener('click', () => {
//     signOut(auth).then(() => {
//         console.log('logout successfully');
//         window.location = 'login.html'
//     }).catch((error) => {
//         console.log(error);
//     });
// })

// // username.innerHTML = doc.data().name;
// // profileImage.src = doc.data().profileUrl;


import {  signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./config.js"

const logout = document.querySelector('#logoutBtn')

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'login.html'
    }).catch((error) => {
        console.log(error);
    });
})

console.log('HEELO WORLD');