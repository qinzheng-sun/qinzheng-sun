
let channelName = "painting";

let who; 

var url = new URL(window.location.href);
var you = url.searchParams.get("you");

let x;
let y;
let px;
let py;

let redVal;
let greenVal;
let blueVal;

console.log(you);
createServer(you); // creating our pubnub server with our name.

function setup() {

    createCanvas(windowWidth, windowHeight);

    // listen for messages coming through the subcription feed on this specific channel. 
    dataServer.addListener({ message: readIncoming});
    dataServer.subscribe({ channels: [channelName] });

    fill(0);
  
  }
  
function draw() {

}
function readIncoming(inMessage) {
  // when new data comes in it triggers this function,
  // we call this function in the setup

  /*since an App can have many channels, we ensure that we are listening
  to the correct channel */
  console.log(inMessage);
    if (inMessage.channel == channelName) {

      x = inMessage.message.x; // get the mouseX value from the other people
      y = inMessage.message.y; // get the mouseY value from the other people
      redVal = inMessage.message.r;
      greenVal = inMessage.message.g;
      blueVal = inMessage.message.b; 

      noStroke();
      fill(redVal, greenVal, blueVal);
      ellipse(x, y, 10, 10);

    }
  }
