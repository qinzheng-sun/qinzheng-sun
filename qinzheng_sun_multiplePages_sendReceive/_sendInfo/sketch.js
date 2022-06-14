
let channelName = "painting";

let x;
let y;
let px;
let py;
var url = new URL(window.location.href);
var you = url.searchParams.get("you");
console.log(you);

let redVal;
let greenVal;
let blueVal;


createServer(you); // creating our pubnub server with our name.

function setup() {

    createCanvas(windowWidth, windowHeight);

    // randomly choose a colour to draw on the receive page
    redVal = random(0,255);
    greenVal = random(0,255);
    blueVal = random(0,255);

  }
  
function draw() {

  textSize(60);
  textAlign(CENTER);
  text("Hello, " +you +". Draw by pressing down with your mouse", windowWidth/2, windowHeight/2);
  if (mouseIsPressed == true) {
    sendTheMessage();
  }
}
  
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY,
      r: redVal,
      g: greenVal,
      b: blueVal
    },
  });
}