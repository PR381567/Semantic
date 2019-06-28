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




function createDiv(snapshot,no){
    var div = document.createElement("div");
   
    display_data = snapshot.data()
    var context = []
    context.push(display_data.chart)
    context.push(display_data.color)
    // sensor_to_use = display_data.type.split(",")
    sensor_to_use = display_data.type
    div.style.width = "300px";
    div.style.height = "300px";
    div.style.borderColor = "black";
    // for(var i =0 ; i<sensor_to_use.length;i++){
        // create_chart_from_data(sensor_to_use[i]+"_001","div"+no,sensor_to_use[i]+" today",context)
    // }
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id","div"+no)
    canvas.style.width = "300px";
    canvas.style.height = "300px";
    div.appendChild(canvas);
    create_chart_from_data(sensor_to_use+"_001","div"+no,sensor_to_use+" today",context)
    // div.style.background = "red";
    // div.style.color = "white";
    div.style.marginRight = "10px"
    div.classList.add("col");
    div.classList.add("col-xs-12");
    div.classList.add("col-sm-6");
    // div.innerHTML = no;
    return div;
}


var ref = db.collection("semantic").doc("display");
ctr = 0;
ref.onSnapshot((snapshot) => {
    if(ctr > 0){
        if(snapshot.data().type === "temp"){
            document.getElementById("temp").appendChild(createDiv(snapshot,ctr));
        }else{
            document.getElementById("hum").appendChild(createDiv(snapshot,ctr));
        }
    }
    ctr+=1;
})
