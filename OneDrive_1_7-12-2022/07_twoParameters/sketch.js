let dataServer;
let pubKey = "YOUR PUBLISH KEY HERE";
let subKey = "YOUR SUBSCRIBE KEY HERE";
let secretKey = "YOUR SECRET KEY HERE";

let channelName = "NFCs"; // we don't define this right away!

let you;


let message; // message we use to send to pubnub

let noParams = false;

var url = new URL(window.location.href);
let NFC1 = url.searchParams.get("NFC1");
let NFC2 = url.searchParams.get("NFC2");

console.log("NFC TAG 1 = " + NFC1);
console.log("NFC TAG 2 = " + NFC2);

if (NFC1 != null) {

  message = NFC1;
} else if (NFC2 != null) {
  message = NFC2;
} else {
  noParams = true;
}

console.log("message = " + message);


function preload() { 

  // logic to create a random UUID
    you = random(0,1000000); 
    console.log(you);
    you = int(you);
    console.log(you);
    you = you.toString();
  
}


function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: you,
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming });
   
    textAlign(CENTER);
    textSize(80);
    if (noParams == false) {
      sendTheMessage();
    } else {
      fetchMessages();
      noStroke();
      fill(255, 0 , 0);
      text("Home (NFC1)", windowWidth*0.25, windowHeight/2);
      fill(0, 0, 255);
      text("School (NFC2)", windowWidth*0.75, windowHeight/2);

    }
    
}
  
function draw() {

  
}
/*
function mousePressed() {

fetchMessages();


}
*/
function fetchMessages() {

console.log("fetching");

  dataServer.fetchMessages(
    {
        channels: [channelName],
        end: '15343325004275466',
        count: 100
    },
    (status, response) => {
      console.log(status);
   //  console.log(response);
      drawMessages(response.channels.NFCs);
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");

  console.log(messageHistory);
  
  for (let i = 0; i < messageHistory.length; i++) {

    if (messageHistory[i].message === "Home") {

      fill(255, 0 , 0);
      ellipse(random(50, (windowWidth/2) - 50), random(50, windowHeight - 50), 50)

    } else if ((messageHistory[i].message === "School")) {
      
      fill(0, 0, 255);
      ellipse(random(50 + windowWidth/2, windowWidth - 50), random(50, windowHeight - 50), 50)

    } 
    
      console.log(messageHistory[i]);
      text(messageHistory[i].message.messageText, windowWidth/2, 100 * (i+1));

  }

}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  
  dataServer.publish({
    channel: channelName,
    message: message,
  });

}

function readIncoming(inMessage) {
  console.log(inMessage);
}
