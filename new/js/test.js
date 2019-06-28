function fileControl() {
    let file_pointer = db.collection("semantic").doc("script");
    let file =  $("#image-file")[0]
    var storageRef = firebase.storage().ref("script/" + file.files[0].name);
    file_pointer.set({
        filename: file.files[0].name,
        change: Math.random()
    })
    console.log(file.files[0]);
    storageRef.put(file.files[0]).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });
}

function click_file_control() {
    console.log("hello")
    $("#image-file").click()


}

