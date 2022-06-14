
/**p5.js example redirecting users to either a send or a receive page */

let you;

let nameSubmit = false; // variable determining whether or not the user has pressed submit yet
let nameInput;

let submitButton;

let sendPage
let receivePage

function setup() {

    createCanvas(windowWidth, windowHeight);

    textSize(60);
    textAlign(CENTER);
    fill(255,0,0);


    nameInput = createInput();
    nameInput.style("font-size: 30px");
    nameInput.position((windowWidth/2)-nameInput.width, 100+ (windowHeight/2));

    submitButton = createButton("Enter name");
    submitButton.style("font-size: 30px");
    submitButton.position(nameInput.x + nameInput.width + 50, 100+ (windowHeight/2));

    submitButton.mousePressed(submitName);

  }
  
function draw() {

  background(255);

  if (nameSubmit == false) {

    text("Welcome, please enter your name", windowWidth/2, windowHeight/2);

  } else {

    submitButton.remove();

    nameInput.remove();
    text("Thank you, " + you + " . Please choose either:" , windowWidth/2, windowHeight/2);

    sendPage = createA('/../_sendInfo/index.html?you='+you, 'Send');
    sendPage.style("font-size: 30px"); // adds a style onto the link and makes the font bigger
    sendPage.position((windowWidth/2) - 200, windowHeight*0.6);

    receivePage = createA('/../_receiveInfo/index.html?you='+you, 'Receive');
    receivePage.style("font-size: 30px");
    receivePage.position((windowWidth/2) + 100, windowHeight*0.6);

    noLoop(); // to be able to click on the link;
  
  }
 
}

function submitName() {

  you = nameInput.value()

  if ( you != "" ) {

    nameSubmit = true;

  } else {

    window.alert("Please enter your name!");
  }

}