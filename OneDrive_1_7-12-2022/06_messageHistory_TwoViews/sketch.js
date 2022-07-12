
let dataServer;
let pubKey = "YOUR PUBLISH KEY HERE";
let subKey = "YOUR SUBSCRIBE KEY HERE";
let secretKey = "YOUR SECRET KEY HERE";

let channelName = "foodHistory";

let you;

//input variables for the form to PubNub
var sendText;
var sendButton;

let history;

var url = new URL(window.location.href);
let params = url.searchParams.get("params");
console.log(params);

let isNFC; // allows us to see whether or not the user is accessing this page with parameters or not

if (params === null) {

  isNFC = false;

} else {

  isNFC = true;

}


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
    }) ;

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming });
   
  
    textAlign(CENTER);

    if (isNFC === true) {
      textSize(80);

      sendText = createInput();
      sendText.style('font-size', '40px');

      sendText.position((windowWidth/2) - sendText.width - 150, windowHeight/2);

      sendButton = createButton("Send a message");
      sendButton.style('font-size', '40px');

      sendButton.position((windowWidth/2) + sendText.width + sendButton.width - 150, windowHeight/2);

      sendButton.mousePressed(sendTheMessage);

      text("What was the last thing you ate?", windowWidth/2, (sendText.y) - 100);

  } else {

      fetchMessages();
      
    }
}
  
function draw() {
 


}

function thankYouPage() {

  background(255);
  sendButton.hide();
  sendText.hide();
  text("Thank you for your response!", windowWidth/2, (sendText.y) - 100);

}

function fetchMessages() {
console.log("fetching");

  dataServer.fetchMessages(
    {
        channels: [channelName],
        end: '15343325004275466',
        count: 100 // last 100 messages
    },
    (status, response) => {
     console.log(response);
      drawMessages(response.channels.foodHistory);
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");

  console.log(messageHistory);
  textSize(80);
  for (let i = 0; i < messageHistory.length; i++) {
    
      console.log(messageHistory[i]);
      text(messageHistory[i].message.messageText, random(100, windowWidth - 100), random(100, windowHeight -100));

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

  thankYouPage();

}

function readIncoming(inMessage) {

  console.log(inMessage);

  if (isNFC == false) {

    text(inMessage.message.messageText, random(100, windowWidth - 100), random(100, windowHeight -100));

  }
} 
