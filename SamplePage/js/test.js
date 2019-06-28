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




function createDiv(snapshot, no,) {

    //Data Creation
    display_data = snapshot.data()
    var context = []
    context.push(display_data.chart)
    context.push(display_data.color)
    sensor_to_use = display_data.type

    //div creation
    var div = document.createElement("div");
    div.classList.add("card2");

    var div_left = document.createElement("div");
    div_left.style.width = "50%";
    div_left.style.float = "left";

    var div_card = document.createElement("div");
    div_card.classList.add("card-text");

    div_left.appendChild(div_card);
    div.appendChild(div_left);

    var div_right = document.createElement("div");
    div_right.style.width = "50%";
    div_right.style.float = "right";

    var div_card_right = document.createElement("div");
    div_card_right.classList.add("card-text");

    // var canvas = document.createElement("canvas");
    // canvas.setAttribute("id", "div" + no);
    // canvas.style.width = "100%";
    // canvas.style.height = "100%";

    var canvas = document.createElement("div");
    canvas.innerHTML = output.data().output;

    div_card_right.appendChild(canvas);
    div_right.appendChild(div_card_right);
    div.appendChild(div_right);

    div_page = document.createElement("div");
    div_page.classList.add("pagedot");

    div_pageno = document.createElement("div");
    div_pageno.classList.add("pagenumber");
    div_pageno.innerHTML = no;

    div_page.appendChild(div_pageno)
    div.appendChild(div_page)

    //call function
    create_chart_from_data(sensor_to_use + "_001", "div" + no, sensor_to_use + " today", context)

    return div;
}


var ref = db.collection("semantic").doc("display");
ctr = 0;
ref.onSnapshot((snapshot) => {
    if (ctr > 0) {
        // if(snapshot.data().type === "temp"){
        //     document.getElementById("temp").appendChild(createDiv(snapshot,ctr));
        // }else{
        //     document.getElementById("hum").appendChild(createDiv(snapshot,ctr));
        // }
        /* document.getElementById("all").appendChild(createDiv(snapshot, ctr)); */

        if(snapshot.data().type === 'cli'){
            file.style.display='block';

        }
    }
    ctr += 1;
})

let actuator_pointer = db.collection("semantic").doc("actuator").collection("servo_001").doc("current")


actuator_pointer.onSnapshot((snapshot) => {
    var value = snapshot.data().value
    $("#appearance1").roundSlider({
        width: 14,
        handleSize: "24,12",
        handleShape: "square",
        sliderType: "min-range",
        radius: 100,
        value: value,
        mouseScrollAction: true,
        circleShape: "half-top",
        handleSize: "+12",
        width: 6,
        max: "180",

        // drag: function(args) {
        //     // handle the drag event here
        //     console.log(args)
        //     actuator_pointer.set({
        //         value: args.value,
        //     })
        // },
        change: function(args) {
            // handle the change event here

            actuator_pointer.set({
                value: args.value,
            })
        }
    });

})

let file_pointer = db.collection("semantic").doc("script");
var file = document.getElementById("image-file");
file.style.display='none';
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