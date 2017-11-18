var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'd3dd73d2-d826-4df1-a5d1-b58144b5c072',
    appPassword: 'ieuHUBIDN673;voreN61%@)'
});

console.log("test");

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Hi... I'm the note bot sample. I can create new notes, read saved notes to you and delete notes.");
    
    // If the object for storing notes in session.userData doesn't exist yet, initialize it
    if (!session.userData.notes) {
        session.userData.notes = {};
        console.log("initializing userData.notes in default message handler");
    }

    // session.send("You said: %s", session.message.text);
    // session.send("This message is sent from bot", session.message.text);
});

// Add global LUIS recognizer to bot
var luisAppUrl = process.env.LUIS_APP_URL || 'https://westeurope.api.cognitive.microsoft.com/luis/v2.0/apps/bbce479b-ae76-4006-8d75-dcc3a0c598b3?subscription-key=d9e11fa748b44d8b9ce63a032c17d505';
// 'https://westeurope.api.cognitive.microsoft.com/luis/v2.0/apps/bbce479b-ae76-4006-8d75-dcc3a0c598b3?subscription-key=d9e11fa748b44d8b9ce63a032c17d505&spellCheck=true&verbose=true&timezoneOffset=0&q=book a flight to indonesia'
bot.recognizer(new builder.LuisRecognizer(luisAppUrl));

// AskWeather dialog
bot.dialog('AskWeather', function(session, args) {
    session.send('You are asking for weather');
    console.log('ask weather identified');
}).triggerAction({
    matches: 'AskWeather'
});

// BookFlight
bot.dialog('BookFlight', function(session, args) {
    session.send('You are booking flight');
    console.log('book flight identified');
}).triggerAction({
    matches: 'BookFlight'
});


// Serve a static web page
server.get(/.*/, restify.plugins.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));
