var config = {
    apiKey: "AIzaSyCN7Bw8pL0mtodqUNTNLqA1NzS0VsIvTR8",
    authDomain: "semantic-b4ee2.firebaseapp.com",
    projectId: "semantic-b4ee2",
    storageBucket: "semantic-b4ee2.appspot.com",
    messagingSenderId: "422426875104",
    appId: "1:422426875104:web:243d9278547b4e89"
};
firebase.initializeApp(config);


var db = firebase.firestore();

var output = "";

//div creation
function createDiv(output) {
    var div = document.createElement("div");
    div.classList.add("card2");
    div.style.width = "25%";

    var div_left = document.createElement("div");
    div_left.style.width = "100%";

    var div_card = document.createElement("div");
    div_card.classList.add("card-text");
    console.log(output)
    if(output===undefined)
        div_card.innerHTML = "<input id='image-file' type='file' />";
    else
        div_card.innerHTML = "<h3>Output :-</h3><br><h4>"+output+"</h4>";

    div_left.appendChild(div_card);
    div.appendChild(div_left);
    return div;
}

var ref = db.collection("semantic").doc("display");
ctr = 0;
ref.onSnapshot((snapshot) => {
    var mode = snapshot.data().mode
    if (ctr > 0) {
        if(mode === "cli"){
            document.getElementById("all").appendChild(createDiv());
            fileControl();
        }
        if(mode === "output"){
            outputControl();
        }
    }
     ctr+=1;
});


function fileControl() {
    let file_pointer = db.collection("semantic").doc("script");
    var file = document.getElementById("image-file");
    file.onchange = function() {
        var storageRef = firebase.storage().ref("script/" + file.files[0].name);
        file_pointer.set({
            filename: file.files[0].name,
            change: Math.random()
        })
        console.log(file.files[0]);
        storageRef.put(file.files[0]).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        });
    }
}



function outputControl() {
    let output_ref = db.collection("semantic").doc("script");
    output_ref.onSnapshot((snapshot) => {
    var output = snapshot.data().output;
    document.getElementById("all").appendChild(createDiv(output));
    })
}

