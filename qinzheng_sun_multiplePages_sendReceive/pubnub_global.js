/**
 * Written for UTSC New Media in Theory
 * Parts of this code is adapted from Nick Puckett & Kate Hartman's Creation & Computation PubNub Code
 * 
 * This file sets up the publish and subscribe events for the all of the pubnub pages on this website.  
*/

let dataServer;
let pubKey = "pub-c-c69a8ba6-a9b0-46b7-88cd-f95a56118ac1";
let subKey = "sub-c-e6326f63-94b2-46d8-8344-56399a3cee02";
let secretKey = "sec-c-OTUwYTMwZDMtZTc0My00N2Q2LWJkZjMtOTYwNWVhZDIyOTk1";


function createServer(you) {

  dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: you,
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

}

