const registerBtn = document.querySelector('#registerBtn');
const loginBtn = document.querySelector('#loginBtn');


registerBtn.addEventListener('click',(e)=>{
    e.preventDefault(e)
    window.location = 'register.html'
    // console.log('register click');
})


loginBtn.addEventListener('click',(e)=>{
    e.preventDefault(e)
    window.location = 'login.html'
    // console.log('register click');
})