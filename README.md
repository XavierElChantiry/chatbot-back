# chatbot-back
This project is the back end logic for a chat bot. It is a basic build that can easily be built and improved upon.

## Usage
To use this app, clone the git repository. Then, from within the reposity run ```node start``` or ```node index.js```.

Now the app is running on http://localhost:5000/

Get requests will return a list of all the patterns and intents

post request will take in an ID and send back what it is programmed to.

the format for post requests is http://localhost:5000/The_ID and require that the 

body must contains "logo":"whatever_information_you_want" and "latLon":"Preferably_coordinates or unidentified"

## Improving The Bot
To improve the bot you must add a Pattern and Intent to the patterns.json file in the patterns folder and add a case to do what you want it to.
```
    {
      "pattern": "Pattern_added_with_regular_expression_format_or_with_xregexp_format",
      "intent": "Intent"
    },
```
```
case 'Intent':
  res.send({
      msg: `message you want to send`
    });
  break;
```
