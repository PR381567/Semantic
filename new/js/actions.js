'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow, BasicCard, Image, List, Suggestions } = require('actions-on-google');
const admin = require('firebase-admin');
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
admin.initializeApp({
     "type": "service_account",
  "project_id": "semanticlab-e51ce",
  "private_key_id": "44c1a72e2caf8e065111eddae5323dd8be19200b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDD5K6HzIipjqd2\nI1rhdibC1qz2Mpksa7uZTU2z9FPPTw0Iwwxl3ImZdD7vleOEZ409ymocUv/I+V2R\nPGrZm3YDLJJHn1EGzshRN+wYIihfkyaibuVkNE0DrMQctLbhcZQiqAP57a9PkXM5\n+/mIQljU5qPrrLGJofUVRnC31mvjwozdaRLsIfD66s919eerhWXX5YHbdMCoisyL\nDVWpUPW5KXhUShZbBXiTAMysiiQId1oPAeXojWAEZW3Yx8VohfMFd9UoD/dW8btP\noS4gsraQRwC0ghDHXoFSH/I1YpwkqPs2OEMX5LwoXsfL8ndyHu7bM73h2cSm5qe8\nfCrWSqTdAgMBAAECggEAXqcYJ9jN7fPWebBioM9YsktNfpZ7SanylwPxuDKl7mUZ\nfLLWQj+6IvI22Mg5i4gHiKRN+kqmekL3kY46aNQDxUvbkIzr91iiFRBq3Uxf6rJs\n+A6Se4UD83MevWoadbtOIyLA7RoKW+2BWjKk41B/oLui1+T1UfX2OKX1H/cU4ZMO\nxl6wsl8xBfeqPs+8NSUtv+Um8HyTIf7N8Zz5Ym9pQrTD356/vQC4ZyMAZr0SNpcR\nwh1pdzI44wComXRg41MqtMowdt7p6TRBjMCTMBe0UYvLu4lg7j3kzrj73avLX8U6\nPLfWe3xLzt6nXhAcrr0J0FjWdq5z40W1gZdAkgLutwKBgQDl3PjRBe93SyLEgOED\nFGIU/0IPCCNEzSh263FCW7Ikv1rWFrDNaxtp0pB+LEYPEezBwi/lC+bzdSC0RJdx\nuLnNI34iJrv/+g/j/EKj/sEaw1KYuQt7ZX9wgBWBk8MrogGOcNN8Ye+jc81Iyy2q\nYN/MgjI6+b85OzM/UFFTXlbzcwKBgQDaKuOipaIYcJwK44n4C81/jnRBBnzKSjIL\nLifqtXfij+lMjGg5BGmI8TtjBmd1fu20fg9lACzBYLgN1gkCqiiCpEwj8RRip/SL\nyEQ+++udZjYFD4gO0q86C5DjclpWxxUUYukiT5J3W8VudPKd1yKd1egJDXQgK00F\nys6/pGMSbwKBgCXQJQpVnKAWNyD2Ro24I65qk1Zfs1WVHkv5zUbqSLLs26eOUgVo\n0jilT+nBpMDD5Ru2syRNwe9Y3ElrYzJs/fu2FADQOGsSmtyZWekadm/No9/FyRLC\njqVWHLOVOC0MWI8zFkdG4SIVYbbQ3bFCgG5nGJZFEWT7zSFkOAyr30frAoGAfdmR\n2KgtWmXTTeC2HPVKBNP7Met5HwQv3A0zD4zA7FvR28t+760g59MoS9ZM5hVjL+Qs\nIzo3lxGg+rJGHlhj6AC4v175QHPceKn83ExcPT7R2Jd+B/b3B8fWO64ieL585Xat\nP5KhTeMNf8tMjUql+GCFanttSoVP+BBmtVwxnlcCgYEAmhXBSedBrtEoXKBqIjVD\nJQ0HVyxoMuxqFQNwC6c48e3FmKylUIXDaxkThN4SKj5+CXGP+uqhC9ruslb9C8dd\nVqAQZTr3laSWTqRJoJG2qvhamziaIz+qavS0Ztlw3nmLSrKL8qcGhYpblXthHy3D\nMKLsiW63qQ1solLaDzXvsZs=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-6htid@semanticlab-e51ce.iam.gserviceaccount.com",
  "client_id": "101198901130204172755",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6htid%40semanticlab-e51ce.iam.gserviceaccount.com"
});
// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });
const db = admin.firestore();


const SELECTED_ITEM_RESPONSES = {
    'KOCHI_LAB': ['You selected kochi lab', 'kochi'],
    'BANGALORE_LAB': ['You selected bangalore lab', 'bangalore'],
    "all": ["all", "all"]
};

// //---------------------------Welcome Intent -----------------------------
// app.intent('Default Welcome Intent', (conv) => {
//   console.log("welcome");
//     const dialogflowAgentRef = db.collection('semantic').doc('display');
//     db.runTransaction(t => {
//         t.update(dialogflowAgentRef, { mode: 'welcome', location: '1,2' });
//         return Promise.resolve('Write complete');
//     }).then(doc => {
//     }).catch(err => {
//         console.log(`Error writing to Firestore: ${err}`);
//     });
// });

// //---------------End of welcome-----------------------------------------

//---------------------------Introduction Intent -----------------------------
app.intent('introduction', (conv, { location }) => {

    if (!location) {
        const option = conv.arguments.get('OPTION') || "all";
        location = SELECTED_ITEM_RESPONSES[option][1];
    }
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    if (location === "all") {
        conv.ask(`Alright! Please choose a lab to continue`);
        conv.ask(new List({
            title: 'Semantic Labs',
            items: {
                'KOCHI_LAB': {
                    synonyms: [
                        'kochi',
                        'kerala',
                    ],
                    title: 'Semantic Lab Kochi',
                    description: 'IOT Lab in Wipro Kochi',
                    image: new Image({
                        url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fkochi.jpg?alt=media&token=113f9adf-3213-4213-9ed2-18de0d7b21e2',
                        alt: 'Image alternate text',
                    }),
                },
                'BANGALORE_LAB': {
                    synonyms: [
                        'bangalore',
                        'bengaluru',
                        'karnataka',
                    ],
                    title: 'Semantic Lab Bangalore',
                    description: 'IOT Lab in Wipro Bangalore',
                    image: new Image({
                        url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fkochi.jpg?alt=media&token=113f9adf-3213-4213-9ed2-18de0d7b21e2',
                        alt: 'Google Home',
                    }),
                },
            },
        }));
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showMultiCard', location: '1,2' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
    } else {
        conv.ask('Welcome to ' + location + ' semantic lab. Here is your overview of all devices connected');
        conv.ask(new BasicCard({
            subtitle: `A state of art IOT lab`,
            title: `Welcome to ` + location + ` semantic lab`,
            image: new Image({
                url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Flab.jpg?alt=media&token=d2e17d42-cf1f-4b4d-a204-2a62137fc516',
                alt: 'lab image',
            }),
        }));
        if (location === 'kochi') location = "1";
        else location = "2";
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showMultiCard', location: location });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
    }
});
//---------------End of introduction-----------------------------------------

//---------------------------Graph Intent -----------------------------------
app.intent('graph', (conv, { sensor, color, time, graph }) => {
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    db.runTransaction(t => {
        t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '3', sensor: sensor, color: color, chart: graph });
        return Promise.resolve('Write complete');
    }).then(doc => {
    }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
    });
    const dialogflowAgentDoc = db.collection('semantic').doc('sensor').collection(sensor + "_001").doc('current');
    return dialogflowAgentDoc.get()
        .then(doc => {
            if (!doc.exists) {
                conv.ask('No data found in the database!');
            } else {
                if (sensor === "hum") {
                    conv.ask("The humidity is " + doc.data().value + " percent");
                    conv.ask(new Suggestions('Expand the graph'));
                    conv.ask(new BasicCard({
                        title: `Humidity : ` + doc.data().value + ` %`,
                        image: new Image({
                            url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fgraph-image.png?alt=media&token=f74ea8e0-9fad-4e61-ae92-20a4bb4e2111',
                            alt: 'humidity',
                        }),
                    }));
                }
                else {
                    conv.ask("The temperature is " + doc.data().value + " degree");
                    conv.ask(new Suggestions('Expand the graph'));
                    conv.ask(new BasicCard({
                        title: `Temperature : ` + doc.data().value + ` Deg`,
                        image: new Image({
                            url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fgraph-image.png?alt=media&token=f74ea8e0-9fad-4e61-ae92-20a4bb4e2111',
                            alt: 'temperature',
                        }),
                    }));
                }
            }
            return Promise.resolve('Read complete');
        }).catch(() => {
            conv.ask('Error reading entry from the Firestore database.');
            conv.ask('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
        });
});


//---------------End of Graph-------------------------------------------------

//---------------------------Graph Color Intent -----------------------------------
app.intent('graph_custom', (conv, { color, graph }) => {
    conv.ask("Changing graph properties");
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    db.runTransaction(t => {
        t.update(dialogflowAgentRef, { chart: graph, color: color });
        return Promise.resolve('Write complete');
    }).then(doc => {
    }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
    });
});

//---------------End of Graph Color -------------------------------------------------

//---------------------------Description Intent -----------------------------------
app.intent('description', (conv, { sensor, desc }) => {
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    if (desc === "connect") {
        conv.ask("Please watch this video to connect the sensor");
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { type: '4', sensor: sensor });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
    }
});

//---------------End of Description -------------------------------------------------

//---------------------------servo Intent -----------------------------------
app.intent('servo', (conv, { direction }) => {
    conv.ask("Changing direction to " + direction + " degree.");
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    db.runTransaction(t => {
        t.update(dialogflowAgentRef, { type: '5', direction: direction, sensor: 'servo' });
        return Promise.resolve('Write complete');
    }).then(doc => {
    }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
    });
    conv.ask(new BasicCard({
        title: `Servo Direction : ` + direction + ` Deg`,
        image: new Image({
            url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2F11965-01.jpg?alt=media&token=e36480d5-3b83-4aac-a261-251751a4ae16',
            alt: 'servo',
        }),
    }));
});

//---------------End of servo-------------------------------------------------



//---------------------------CLI Intent -----------------------------------
app.intent('cli', (conv, { cliAction }) => {
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    if (!cliAction) {
        //Open CLI interface
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '0' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Here is your CLI interface');
    } else if (cliAction === "list") {
        //Show list of files
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '2' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Here is the list of items');
    } else if (cliAction === "upload") {
        //Show file upload dialog
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '1' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Please select a file');
    } else {
        //Show file upload dialog
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '8' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Please select a file');
    }
});


//---------------End of cli-------------------------------------------------

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);