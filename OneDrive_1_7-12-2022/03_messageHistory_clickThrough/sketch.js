

let dataServer;
let pubKey = "pub-c-c69a8ba6-a9b0-46b7-88cd-f95a56118ac1";
let subKey = "sub-c-e6326f63-94b2-46d8-8344-56399a3cee02";
let secretKey = "sec-c-OTUwYTMwZDMtZTc0My00N2Q2LWJkZjMtOTYwNWVhZDIyOTk1";

let channelName = "history";

let you;

//input variables for the form to PubNub

let count = 0;
let historyLength;
let allMessages = [];

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
  

    fetchMessages();

}
  
function draw() {
 
  background(255);
  textSize(40);
  text(allMessages[count], windowWidth/2, windowHeight/2);

}

function mousePressed() {

  if (count < historyLength) {
    count++;

  } else {
    count = 0;
  }


}


function fetchMessages() {
console.log("fetching");

  dataServer.fetchMessages(
    {
        channels: [channelName],
        end: '15343325004275466',
        count: 100
    },
    (status, response) => {
     console.log(response.channels.history);
      
      historyLength = response.channels.history.length;

      for (let i = 0; i < historyLength; i++) {
    
        append(allMessages,response.channels.history[i].message.messageText);

    }
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");

  console.log(messageHistory);
  textSize(80);
  for (let i = 0; i < messageHistory.length; i++) {
    
      console.log(messageHistory[i]);
      text(messageHistory[i].message.messageText, windowWidth/2, 100 * (i+1));

  }

}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      messageText: sendText.value()
    },
  });

  sendText.value("");

}

function readIncoming(inMessage) {
  console.log(inMessage);
  fetchMessages();

}
