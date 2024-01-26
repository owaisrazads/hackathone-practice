// import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { auth, db } from "./config.js";
// import { collection, addDoc, getDocs, doc, deleteDoc, Timestamp  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";






// // user login/logout check

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const uid = user.uid
//         console.log(uid);
//         getDataFromFirestore()

       
//     } else {
//         window.location = 'login.html'
//     }
// })


// const form = document.querySelector('#form');
// const title = document.querySelector('#title');
// const description = document.querySelector('#description');
// const logout = document.querySelector('#logout');
// const container = document.querySelector('.container');
// const loadingIndicator = document.querySelector('#loading');





// //get data from firestore();

// async function getDataFromFirestore() {
//     loadingIndicator.innerHTML = '<span class="loading loading-spinner loading-lg"></span>';

//     let arr = [];
//     const querySnapshot = await getDocs(collection(db, "todos"));
//     querySnapshot.forEach((doc) => {
//         arr.push(doc.data());
//     });
//     console.log(arr);
//     arr.map((item) => {       
//         container.innerHTML += `   <div class="card w-96 bg-base-100 shadow-xl">
//         <div class="card-body">
//           <p> <span class="text-2xl ">Title:${item.title}</span> </p>
//           <p> <span class="text-2xl ">Description:${item.description}</span> </p>
//           <div class="card-actions justify-end">
//           <button type="submit" class="btn btn-error" id="dltBtn">Delete</button>
//           <button type="submit" class="btn btn-info" id="editBtn">Edit</button>
//           </div>
//         </div>
//       </div>`
//     });
//     loadingIndicator.innerHTML = ''; // Hide loading indicator after data is loaded 
// };



// //add Data From Firestore();

// form.addEventListener('submit', async (event) => { 
//     event.preventDefault()
//     container.innerHTML = ''
//     try {
//         loadingIndicator.innerHTML = '<span class="loading loading-spinner loading-lg"></span>';
//         const docRef = await addDoc(collection(db, "todos"), {
//             title: title.value,
//             description: description.value,
//             uid: auth.currentUser.uid,
//             postDate: Timestamp.fromDate(new Date())
//         });
//         console.log("Document written with ID: ", docRef.id);
//         getDataFromFirestore()
//         title.value = ''
//         description.value = ''
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })



// //logout function

// logout.addEventListener('click', () => {
//     signOut(auth).then(() => {
//         console.log('logout successfully');
//         window.location = 'login.html'
//     }).catch((error) => {
//         console.log(error);
//     });
// })


import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, doc, deleteDoc, Timestamp  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// user login/logout check
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid
        console.log(uid);
        getDataFromFirestore();
    } else {
        window.location = 'login.html';
    }
});

const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const logout = document.querySelector('#logout');
const container = document.querySelector('.container');
const loadingIndicator = document.querySelector('#loading');
let arr = [];

// get data from firestore();
async function getDataFromFirestore() {
    loadingIndicator.innerHTML = '<span class="loading loading-spinner loading-lg"></span>';

    arr = []; // Clear the array before fetching new data

    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    console.log(arr);
    renderTodo();
    loadingIndicator.innerHTML = ''; // Hide loading indicator after data is loaded 
}

function renderTodo() {
    container.innerHTML = ''; // Clear the container before rendering

    arr.map((item) => {       
        container.innerHTML += `   
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <p> <span class="text-2xl ">Title:${item.title}</span> </p>
                    <p> <span class="text-2xl ">Description:${item.description}</span> </p>
                    <div class="card-actions justify-end">
                        <button type="submit" class="btn btn-error" id="dltBtn">Delete</button>
                        <button type="submit" class="btn btn-info" id="editBtn">Edit</button>
                    </div>
                </div>
            </div>`;
    });

    const del = document.querySelectorAll('#dltBtn');
    const upd = document.querySelectorAll('#editBtn');

    del.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('delete called', arr[index]);
            await deleteDoc(doc(db, "posts", arr[index].docId))
                .then(() => {
                    console.log('post deleted');
                    arr.splice(index, 1);
                    renderTodo()
                });
        })
    })
    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('update called', arr[index]);
            const updatedTitle = prompt('enter new Title');
            await updateDoc(doc(db, "posts", arr[index].docId), {
                title: updatedTitle
            });
            arr[index].title = updatedTitle;
            renderTodo()

        })
    })


}

// add Data From Firestore();
form.addEventListener('submit', async (event) => { 
    event.preventDefault();

    try {
        loadingIndicator.innerHTML = '<span class="loading loading-spinner loading-lg"></span>';
        const docRef = await addDoc(collection(db, "todos"), {
            title: title.value,
            description: description.value,
            uid: auth.currentUser.uid,
            postDate: Timestamp.fromDate(new Date())
        });
        console.log("Document written with ID: ", docRef.id);
        
        // Add the new data to the array
        arr.unshift({
            title: title.value,
            description: description.value,
            uid: auth.currentUser.uid,
            postDate: Timestamp.fromDate(new Date())
        });

        // Render the updated array
        renderTodo();

        title.value = '';
        description.value = '';
    } catch (e) {
        console.error("Error adding document: ", e);
    } finally {
        loadingIndicator.innerHTML = ''; // Hide loading indicator
    }
});

// logout function
logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'login.html';
    }).catch((error) => {
        console.log(error);
    });
});


//mera code thk nh chl rha h





