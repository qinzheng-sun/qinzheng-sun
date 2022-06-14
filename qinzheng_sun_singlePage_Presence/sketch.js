

let dataServer;
let pubKey = "pub-c-c69a8ba6-a9b0-46b7-88cd-f95a56118ac1";
let subKey = "sub-c-e6326f63-94b2-46d8-8344-56399a3cee02";
let secretKey = "sec-c-OTUwYTMwZDMtZTc0My00N2Q2LWJkZjMtOTYwNWVhZDIyOTk1";

let occupancy = 0; 


let channelName = "presenceTest";

  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Roy",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });
    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    // listen for messages coming through the subcription feed on this specific channel. 
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() {
  background(0,222,222);
  textSize(70);
  textAlign(CENTER);
  fill(255,45,45);

 if (occupancy > 0) {

  text("There are " +  occupancy + " people with you here!", windowWidth/2, windowHeight/2);

 } else {

  text("There is no one with you here!", windowWidth/2, windowHeight/2);

 }
 
}
 

function mousePressed() {

  sendTheMessage();
}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      test: "test"
    },
  });
}

function readIncoming(inMessage) {
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

  /* connnectionInfo.action == "join"*/
  /* connnectionInfo.action == "leave"*/

}