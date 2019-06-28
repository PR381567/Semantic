// var config = {
//     apiKey: "AIzaSyCN7Bw8pL0mtodqUNTNLqA1NzS0VsIvTR8",
//     authDomain: "semantic-b4ee2.firebaseapp.com",
//     projectId: "semantic-b4ee2",
//     storageBucket: "semantic-b4ee2.appspot.com",
//     messagingSenderId: "422426875104",
//     appId: "1:422426875104:web:243d9278547b4e89"
//   };
//   firebase.initializeApp(config);

  
// var db = firebase.firestore();


function create_chart_from_data(sensor_id,chart_id,chart_label,context={}){
    db.collection("semantic").doc("sensor").collection(sensor_id).doc("historical").onSnapshot((querySnapshot) => {
        console.log(querySnapshot.data())
        var historical_data = querySnapshot.data();
        var data_labels = [];
        var data_values = []
        for(var date in historical_data){
            data_labels.push(date.slice(0,-10));
            data_values.push(historical_data[date])
         }
        create_chart(chart_id,data_labels,data_values,chart_label,context)
    })
}

function  create_chart(chart_id,data_labels,data_values,label,context,color){
    console.log(chart_id,data_labels,data_values,label,context)
    console.log(data_values)
    var keys=  Object.keys(context);
    if(context[0] === ""){
        context[0] = "line";
    }
    var ctx = document.getElementById(chart_id);
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data_labels,
            datasets: [{
                label: label,
                data: data_values,

                "borderColor":"rgb(75, 192, 192)",
                
                backgroundColor: context[1]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        },
        
        type: context[0]
        
    });
}


// var ref = db.collection("semantic").doc("display");

// var ctr = 0;
// ref.onSnapshot((snapshot) => {
//     display_data = snapshot.data()
//     var context = []
//     context.push(display_data.chart)
//     context.push(display_data.color)
//     sensor_to_use = display_data.type.split(",")
//     if(ctr > 0 && display_data.mode === "graph"){
//         // $(".blocks").hide();
//         for(var i =0 ; i<sensor_to_use.length;i++){
//                 $("#"+sensor_to_use[i]+"_chart").parent().show()
//                 create_chart_from_data(sensor_to_use[i]+"_001",sensor_to_use[i]+"_chart",sensor_to_use[i]+" today",context)
//         }
//     }
//     ctr += 1;
// });

