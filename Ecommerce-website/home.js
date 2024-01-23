import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";






// user login/logout check

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid
        console.log(uid);
        getDataFromFirestore()

       
    } else {
        window.location = 'login.html'
    }
})


const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const logout = document.querySelector('#logout');
const container = document.querySelector('.container')




//Get Data form firestore



async function getDataFromFirestore() {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    console.log(arr);

    arr.map((item) => {

        
        container.innerHTML += `   <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <p> <span class="text-2xl ">Title:${item.title}</span> </p>
          <p> <span class="text-2xl ">Description:${item.description}</span> </p>
          <div class="card-actions justify-end">
          <button class="btn btn-error" id="dltBtn">Delete</button>
          <button class="btn btn-info" id="editBtn">Edit</button>
          </div>
        </div>
      </div>`
    })
}

const dltBtn = document.querySelector('#dltBtn')
const editBtn = document.querySelector('#editBtn')


dltBtn.forEach((brn, index)=>{
    dltBtn.addEventListener('click', ()=>{
        
    })
})



//Add data from firestore

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    container.innerHTML = ''
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            title: title.value,
            description: description.value,
            uid: auth.currentUser.uid
        });
        console.log("Document written with ID: ", docRef.id);
        getDataFromFirestore()
        title.value = ''
        description.value = ''

    } catch (e) {
        console.error("Error adding document: ", e);
    }

})



//logout function

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'login.html'
    }).catch((error) => {
        console.log(error);
    });
})






