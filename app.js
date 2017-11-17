var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "d3dd73d2-d826-4df1-a5d1-b58144b5c072",
    appPassword: "ieuHUBIDN673;voreN61%@)"
});

console.log("test");

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
    session.send("This message is sent from bot", session.message.text);
});

// Serve a static web page
server.get(/.*/, restify.plugins.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));
