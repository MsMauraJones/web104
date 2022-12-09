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

//Listener to determine if user signed in, then change page header to user name and populate gear category drop downs. Redirect to sign in page if not signed in  
firebase.auth().onAuthStateChanged((user) => {
     if (user) {
        var uid = user.uid;
        db.collection("gearUpUsers").doc(uid).get().then((doc) => {
        let userNameNow = doc.data().userName
        let userNameA = document.getElementById("userName")
        userNameA.innerText = userNameNow
        displayCategories()
        displayCategoriesB()
        })
    } 
    else {
     window.location.href = "index.html" 
    }
   })

//Populates gear category drop downs from firebase

/*function displayCategories(){
    const user = firebase.auth().currentUser; 
        if (user) {
            var uid = user.uid;
            db.collection("gearUpUsers").doc(uid).get().then((doc) =>{    
            let categoryArrayB = doc.data().categories
            console.log(categoryArrayB);
            for (let i =0 ; i < categoryArrayB.length; i++){
                let dropDownItem = document.createElement("option")
                let dropDownLoc = document.getElementById("gearCategoryA")
                let dropDownLocB = document.getElementById("gearCategoryB")
                let dropDownLocC = document.getElementById("gearCategoryC")
                let dropDownLocD = document.getElementById("gearCategoryD")
                let dropDownLocE = document.getElementById("gearCategoryE")
                dropDownItem.innerText=categoryArrayB[i]
                dropDownItem.setAttribute(categoryArrayB[i], categoryArrayB[i])
                dropDownLoc.appendChild(dropDownItem)
                dropDownLocB.appendChild(dropDownItem)
                dropDownLocC.appendChild(dropDownItem)
                dropDownLocD.appendChild(dropDownItem)
                dropDownLocE.appendChild(dropDownItem)
            }
        })
    } else {
        console.log("no category available")
    }
}*/


function displayCategories(){
    const user = firebase.auth().currentUser; 
        if (user) {
            var uid = user.uid;
            db.collection("gearUpUsers").doc(uid).get().then((doc) =>{    
            let categoryArrayB = doc.data().categories
            console.log(categoryArrayB);
            for (let i =0 ; i < categoryArrayB.length; i++){

                let dropDownItem = document.createElement("option")
                let dropDownAttr = document.createAttribute("value")
                let dropDownLoc = document.getElementById("gearCategoryA")

                dropDownItem.innerText=categoryArrayB[i]
                dropDownAttr.value = categoryArrayB[i]

                dropDownItem.setAttributeNode(dropDownAttr)
                dropDownLoc.appendChild(dropDownItem)
                
            }
        })
    } else {
        console.log("no category available")
    }
}

function displayCategoriesB(){
    const user = firebase.auth().currentUser; 
        if (user) {
            var uid = user.uid;
            db.collection("gearUpUsers").doc(uid).get().then((doc) =>{    
            let categoryArrayB = doc.data().categories
            console.log(categoryArrayB);
            for (let i =0 ; i < categoryArrayB.length; i++){

                let dropDownItem = document.createElement("option")
                let dropDownAttr = document.createAttribute("value")
                let dropDownLocB = document.getElementById("gearCategoryB")

                dropDownItem.innerText=categoryArrayB[i]
                dropDownAttr.value = categoryArrayB[i]

                dropDownItem.setAttributeNode(dropDownAttr)
                dropDownLocB.appendChild(dropDownItem)
                
            }
        })
    } else {
        console.log("no category available")
    }
}

//Updates gear category array on firebase
document.getElementById("newCatNameB").addEventListener("click", function(event){
    console.log(event)
    event.preventDefault()
    newCategory() 
})

function newCategory(){
    const user = firebase.auth().currentUser; 
        if (user) {
            var uid = user.uid;
            console.log(uid)
            let addNewCat = document.getElementById("newCatName").value
            console.log(addNewCat)
            var categoriesRef = db.collection("gearUpUsers").doc(uid)
            console.log(categoriesRef)
            categoriesRef.update({
                categories: firebase.firestore.FieldValue.arrayUnion(addNewCat)
            })
            
        } else {
  // No user is signed in.
    window.location.href = "index.html"        
    }
}

//add to inventory
document.getElementById("createItem").addEventListener("click", function(event){
    console.log(event)
    // event.preventDefault()
    newInventoryItem() 
})

function newInventoryItem(){
    const user = firebase.auth().currentUser; 
    if (user) {
        var uid = user.uid;
        // var newItemRef = db.collection("gearUpUsers").doc(uid)
        var newObject = {
        categoryInfo: document.getElementById("gearCategoryB").value,
        gearType: document.getElementById("newGearType").value,
        gearSize: document.getElementById("newGearSize").value,
        gearLoc: document.getElementById("newGearLoc").value,
        gearFam: document.getElementById("newGearFam").value,
        gearStatus1: document.getElementById("gearStatus").value,
        gearNotes1: document.getElementById("gearNotes1").value,
        
        }
        console.log(newObject)
        var inventoryRef = db.collection("gearUpUsers").doc(uid)
        inventoryRef.update({
                inventory: firebase.firestore.FieldValue.arrayUnion(newObject)
            })
        alert("You have added a new item to your inventory!")
        document.getElementById("addToInventoryForm").reset()
    } else {
// No user is signed in.
window.location.href = "index.html"        
}
}

function inventoryDisplay(){

    const user = firebase.auth().currentUser; 
    
    if (user) {
        var uid = user.uid;
        db.collection("gearUpUsers").doc(uid).get().then((doc)=>{
            let inventoryArrayB = doc.data().inventory
            
            for (let i=0; i < inventoryArrayB.length; i++){
                
                let target = document.getElementById("searchDisplay")

                let categoryInfoB = doc.data().inventory[i].categoryInfo
                let gearTypeInfo = doc.data().inventory[i].gearType
                let gearStatusInfo = doc.data().inventory[i].gearStatus1
                let gearSizeInfo = doc.data().inventory[i].gearSize
                let gearNotesInfo = doc.data().inventory[i].gearNotes1
                let gearFamInfo = doc.data().inventory[i].gearFam
                let gearLocInfo = doc.data().inventory[i].gearLoc

                let infoBlock = document.createElement("div")
                let infoBlockText = "- Item " + i + ": "  + gearTypeInfo + " " + categoryInfoB + "; " + "size: " + gearSizeInfo + "; " + "location: " + gearLocInfo + "; " + "family member: " + gearFamInfo + "; " + "notes: " + gearNotesInfo + " ."
                
                infoBlock.innerText = infoBlockText

                target.appendChild(infoBlock)   
            }
        })
    } else {window.location.href = "index.html"        
}
}

    
    // let uuid = user.uid
    // let docs = db.collection("gearUpUsers");

    // let items = docs.get().then(data =>{
        

    //     data.forEach(doc => {
    //         let target = document.getElementById("searchDisplay")
    //         //target.innerHTML += 
    //         let i = 0
    //         if (doc.id == uuid) {
    //             console.log(doc.data())
    //             target.innerHTML += doc.data().inventory[i].gearType
    //             i++
                // target.innerHTML += doc.data().inventory[1].gearType
               // i++
                
            //    let html `<div class="test${i}> ${doc.data().inventory}</div>`
            //    <button id="delete">delete</button>
            //    let eventdel = document.getElementById(delete).addEventListener(event =>{


            //    })

          //  console.log(doc.id)
        

//Sign out function for test purposes    
function signOut(){
    firebase.auth().signOut().then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}  
