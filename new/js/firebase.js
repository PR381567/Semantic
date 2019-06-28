var config = {
   apiKey: "AIzaSyCXPQl0B67C3cl5TCZ2WJm_ytcNecAaGWY",
    authDomain: "semanticlab-e51ce.firebaseapp.com",
    databaseURL: "https://semanticlab-e51ce.firebaseio.com",
    projectId: "semanticlab-e51ce",
    storageBucket: "semanticlab-e51ce.appspot.com",
    messagingSenderId: "858943945955",
    appId: "1:858943945955:web:4ca5862204a374b6"
};
firebase.initializeApp(config);


var db = firebase.firestore();
lst = [];

pwd = ""
function event_listener() { }

function data_capture(display_locations) {
    var ref = db.collection("semantic labs");
    event_listener = ref.onSnapshot((snapshot) => {
        let location_data = [];
        snapshot.forEach((snap) => {
            console.log(snap.id)
            console.log(typeof (snap.id))
            console.log(display_locations.includes(snap.id))
            console.log(display_locations[0])
            console.log(typeof (display_locations[0]))
            if (display_locations.includes(snap.id)) {

                location_dict = {}
                location_data_each = snap.data();
                console.log(location_data_each)
                subtitle = {}
                for (var edge in location_data_each["Connected_Edges"]) {
                    subtitle_each = location_data_each["Connected_Edges"][edge].Name
                    pwd = location_data_each["Connected_Edges"]['1']["settings"].pwd
                    list_of_card = []
                    for (var device in location_data_each["Connected_Edges"][edge]["Connected_Devices"]) {
                        heading = location_data_each["Connected_Edges"][edge]["Connected_Devices"][device].Name
                        body = location_data_each["Connected_Edges"][edge]["Connected_Devices"][device].data.current
                        unit = location_data_each["Connected_Edges"][edge]["Connected_Devices"][device].Unit
                        let each_card_dict = {
                            heading: `<h1>` + heading + `</h1>`,
                            body: `<h1 class='text-center align-self-center large-text'>` + body + unit + `</h1>`,
                            "class": "card-expand",

                        }
                        list_of_card.push(each_card_dict)
                    }
                    subtitle_with_button = `<span>` + subtitle_each + `</span>
                    <button class="btn btn-sm btn-outline-dark btn-rounded-custom" onclick="put_cli_card()">Manage</button>`
                    subtitle[subtitle_with_button] = list_of_card
                }
                location_dict.title = location_data_each.Name;
                location_dict.subtitles = subtitle
                location_data.push(location_dict);
            }
        })
        create_container(location_data)
        // console.log(location_data)
    })
}
output = ""
file = []

function get_cmd_from_firebase(id, device_id, output_location, file_location) {
    var ref = db.collection("semantic labs").doc(id);
    ref.onSnapshot((snapshot) => {
        console.log()
        var settings_path = snapshot.data()["Connected_Edges"][device_id]["settings"]
        var temp_output = settings_path["output"]
        var file_output = settings_path["file_upload"]
        pwd = settings_path.pwd
        if (temp_output != output) {
            var height = $("#" + output_location).parent().height()
            $("#" + output_location).text(temp_output)
            console.log($("#" + output_location).height(height - 100))
        }
        output = temp_output
        console.log(file_output)
        var height = $("#" + file_location).parent().height()
        $("#" + file_location).html(list_to_html(file_output))
        console.log($("#" + file_location).height(height - 100))

    })
}

function put_cmd_to_firebase(id, device_id, cmd) {
    var ref = db.collection("semantic labs").doc(id);

    var settings_path = "Connected_Edges." + device_id + ".settings"
    var current_path = settings_path + ".current"
    var change_path = settings_path + ".change"
    update_dict = {
        [change_path]: Math.random() * 1000,
        [current_path]: cmd
    }
    ref.update(update_dict)
}
data_change_checker = ""
create_cli_done = false
function display_the_screen() {
    var ref = db.collection("semantic").doc("display");
    var rvar = db.collection("semantic").doc("sensor");
    ref.get().then((snapshot) => {
        console.log(snapshot.data())


        data_values = snapshot.data()
        mode = data_values.mode
        locations = data_values.location.split(",")
        type = data_values.type
        if (data_values.chart != data_change_checker.chart || data_values.color != data_change_checker.color || data_values.sensor != data_change_checker.sensor || data_values.mode != data_change_checker.mode || data_values.location != data_change_checker.location || type != data_change_checker.type) {

            if (mode === 'welcome') {
                if (moveheading_done) {
                    reversemoveheading()
                }
                if (smoothscroll_done) {
                    reversesmoothscroll()
                }
            }
            else if (mode === 'showMultiCard') {
                if (!moveheading_done) {
                    moveheading()
                }
                if (!smoothscroll_done) {
                    smoothscroll()
                }
                event_listener()
                data_capture(locations)
                let main_title = $("#main_title")
                main_title.fadeOut(200, function () {
                    main_title.text("Overview")
                    main_title.fadeIn(600)

                })
            }
            else if (mode === "showSingleCard") {
                if (!moveheading_done) {
                    moveheading()
                }
                if (!smoothscroll_done) {
                    smoothscroll()
                }
                if (type == "0" || type == "8") {
                    console.log(type)
                    event_listener()
                    put_cli_card()
                    create_cli_done = true
                }
                else if (type == "1") {
                    click_file_control()
                }
                else if (type == "2") {
                    $("#last_line").val("ls")
                    move_cli_pointer()
                    put_cmd_to_firebase('1', '1', "ls")
                    get_cmd_from_firebase('1', '1', "output_body", "file_body")
                }
                else if (type == '3') {
                    console.log(type)
                    context = [data_values.chart, data_values.color]

                    if (data_values.sensor == "temp") {
                        rvar = rvar.collection("temp_001").doc("historical");
                        sensor = "Temperature"
                        current_val = 24
                        unit = "°"
                        file = "snowflake.svg"
                    }
                    else {
                        rvar = rvar.collection("hum_001").doc("historical");
                        sensor = "Humidity"
                        current_val = 80
                        unit = "%"
                        file = "water-drop.svg"
                    }
                    rvar.get().then((snapshot) => {
                        a = snapshot.data()
                        lst1 = []
                        lst2 = []
                        for (var i in a) {
                            lst1.push(i.slice(11, 16))
                            lst2.push(a[i])

                        }
                        console.log(a)
                        put_graph_card(sensor, lst1, lst2, current_val, unit, file, context)
                    })
                }
                else if (type == '4') {
                    if (data_values.sensor == 'temp' || data_values.sensor == 'hum') {
                        url = "https://www.youtube.com/embed/KUr8WgSIsfk"
                        put_video_card(url)
                    }
                    if (data_values.sensor == 'servo') {
                        url = "https://www.youtube.com/embed/Sg8VaKiZFVE"
                        put_video_card(url)
                    }

                }
                else if (type == '5') {

                    put_servo_interface(data_values.direction)
                    

                    let actuator_pointer = db.collection("semantic").doc("display")
                    actuator_pointer.onSnapshot((snapshot) => {
                        
                        var value = snapshot.data().direction

                        $("#handle2").roundSlider({
                            sliderType: "min-range",
                            radius: 250,
                            showTooltip: false,
                            width: 20,
                            value: value,
                            handleSize: 0,
                            handleShape: "square",
                            circleShape: "half-top",
                            max: "180",

                            change: function (args) {
                                //    handle the change event here
        
                                      ref.update({
                                            direction: args.value,
                                        })
                                    }
                        });
                        
                        // $("#appearance4").roundSlider({
                        //     width: 14,
                        //     handleSize: "24,12",
                        //     handleShape: "square",
                        //     sliderType: "min-range",
                        //     radius: 100,
                        //     value: value,
                        //     mouseScrollAction: true,
                        //     circleShape: "half-top",
                        //     handleSize: "+12",
                        //     width: 6,
                        //     max: "180",

                        //     // drag: function(args) {
                        //     //     // handle the drag event here
                        //     //     console.log(args)
                        //     //     actuator_pointer.set({
                        //     //         value: args.value,
                        //     //     })
                        //     // },
                        //     change: function (args) {
                        //         // handle the change event here

                        //         ref.update({
                        //             direction: args.value,
                        //         })
                        //     }
                        // });

                    })
                }

            }
        }
        data_change_checker = data_values
    })
}

setInterval(display_the_screen, 1000)


