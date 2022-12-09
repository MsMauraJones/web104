// document.getElementById("????").addEventListener("click", function(event){
//     console.log(event)
//     event.preventDefault()
//     ???() 
// }) THIS CODE TO SUPPRESS FORMS attempt to submit and reload page. May need, may not. Change question marks to reflect button id and appropriate function

//function goToCreateUser(){location.replace("url to create user")}

const firebaseConfig = {
    apiKey: "AIzaSyDlnC1htcbqQP9olxlcfvVxhNiZkvGI6Is",
    authDomain: "web104-c3843.firebaseapp.com",
    projectId: "web104-c3843",
    storageBucket: "web104-c3843.appspot.com",
    messagingSenderId: "68373630077",
    appId: "1:68373630077:web:4c2a5fb7df252c4e607514",
    measurementId: "G-V70K8XMBQ6"    
};


  firebase.initializeApp(firebaseConfig); 
  const db = firebase.firestore();

  document.getElementById("submitLogin").addEventListener("click", function(event){
    console.log(event)
    event.preventDefault()
    signIn() 
})

//Create User Page


function signIn(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    console.log("logged in")
    var user = userCredential.user;
    let userID = userCredential.user.uid
    //this is what my document is going to be
    console.log(userID)
    console.log(userCredential)
    window.location.href = "mainpage.html"

   // localStorage.setItem("loggedIn",true) 

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function goToCreateUser(){
        window.location.href = "createuser.html"
}