var videoSource = new Array();
videoSource[0]='Video11.mp4';
videoSource[1]='Video12.mp4';
videoSource[2]='Video3.mp4';
var videoCount = videoSource.length;

document.getElementById("myVideo").setAttribute("src",videoSource[0]);


function videoPlay(videoNum)
{
document.getElementById("myVideo").setAttribute("src",videoSource[videoNum]);
document.getElementById("myVideo").load();
document.getElementById("myVideo").play();
}

// videoPlay(1);
//  videoPlay(0);
 //videoPlay(2);

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
        
        if(snapshot.data().mode === 'cli'){
            videoPlay(0);
        }
        if(snapshot.data().mode === 'file'){
            videoPlay(1);
            }

        
        }
        ctr += 1;
    })