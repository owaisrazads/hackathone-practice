import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection,  getDocs,  query, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const profileImage = document.querySelector('#profileImage');
const username = document.querySelector('#username');
const logout = document.querySelector('#logout');
const submit = document.querySelector('#submit');


let uid;

//user login or logout function
onAuthStateChanged(auth, async (user) => {
    if (user) {
         uid = user.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            username.innerHTML = doc.data().name
            profileImage.src = doc.data().profileUrl
            // console.log(doc.data()).name;
        });
        getDataFromFirestore(user.uid)
    } else {
        window.location = 'login.html'
    }
});








logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'login.html'
    }).catch((error) => {
        console.log(error);
    });
})




