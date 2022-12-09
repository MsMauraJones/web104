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

//Register User Button
document.getElementById("newRegister").addEventListener("click", function(event){
    console.log(event)
    event.preventDefault()
    createUser() 
})

//Creates user
function createUser(){ 
    let email = document.getElementById("newEmailLogin").value
    let password = document.getElementById("newPassword").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        console.log ("user created")
        var user = userCredential.user;
        let userID = userCredential.user.uid
        console.log(userID)
        let name = document.getElementById("newUName").value
        console.log(name)
        let categoryInfo = makeCategory1()
        console.log(categoryInfo)
        let inventoryArrayAll = [] //Creates the blank inventory array into which objects are pushed on mainpage
        db.collection('gearUpUsers').doc(userID).set({ //Creates document based on unique user id in Firebase and associates a collection with user name and categories
            userName: name,
            categories: categoryInfo,
            inventory: inventoryArrayAll
        })
        
        
  })
 .then(
    //document.getElementById("createUserForm").style.display = "display:none"
    document.getElementById("mainPageRedirect").style.display = ""
)
 .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

function makeCategory1(){//Create a category array of gear types to be saved in Firebase and used for future inventory items
        
    let categoryArray = new Array()
    let checkboxes = document.querySelectorAll('input[type="checkbox"]')
    for (i=0;
        i<checkboxes.length; i++){
            if (checkboxes[i].checked == true){categoryArray.push(checkboxes[i].value)}
        }
    return categoryArray   
}

function goToMainPage(){//After user created, this redirects to main page
    window.location.href = "mainpage.html"
}

