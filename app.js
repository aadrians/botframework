var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();

server.listen()

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "d3dd73d2-d826-4df1-a5d1-b58144b5c072",
    appPassword: "wwpjTXNZ19-*&dyuHNL670!"
});

console.log("test");

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
    session.send("This message is sent from bot", session.message.text);
});

// FB page ID: 127971741225929
// URL: https://www.facebook.com/TPA-Musihoven-127971741225929/

// From FB
// API version 2.11
// APP ID: 688967961295116 
// App secret: 793c8b9df68eb70ff199175a0324f121

//Facebook App
// Page token for TPA Musihoven: EAAJynNqYOQwBAJBZAGmc9HJQ4TpG5ieAiCrscZBj6ZBkO4HwELNMQZA01ZAOQYq27TzKB94yfIHYOOcZBKujocZB25VMarHinOZCFVcZA1LXED5bhRu9NacvVuQP9DhubiWiQZAio1soPS4wZCxfazT73KF1vKGhUpUIv2T10rvWMoS3gZDZD


// registering app
// App name: AryaTestBot
// App ID: d3dd73d2-d826-4df1-a5d1-b58144b5c072
// App password: wwpjTXNZ19-*&dyuHNL670!
