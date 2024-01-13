import {  signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./config.js"

const logout = document.querySelector('#logoutBtn')

logout.addEventListener('click', () => {
    console.log('dlt clled');
    signOut(auth).then(() => {
        window.location = "login.html"
      }).catch((error) => {
        console.log(error);
      });
})

