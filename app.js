const express = require("express");
const cors = require('cors')
const fetch = require("node-fetch");
const matcher = require('./matcher'); 
const patterns = require("./patterns/patterns.json")

const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cors())




app.listen(
    PORT,
    () => console.log(`living on http://localhost:${PORT}`)
);

app.get('/.well-known/pki-validation/353AE23A63F132AFB8D412122F0D40CF.txt', (req, res) => res.download('.well-known/pki-validation/353AE23A63F132AFB8D412122F0D40CF.txt'))

app.get("/", (req, res) => {
    res.status(200).send({
        patterns: patterns,

    })

});



app.post('/:id', cors() , (req, res) => {
    const {id} = req.params;
    const {logo} = req.body;
    const {latLon} = req.body;


    if (!logo) {
        res.status(418).send({message: 'we need logo'})
    }


    
    matcher(`${id}`, data => {
        let wtt
        switch(data.intent) {
            case 'Hello':
                res.send({
                    // msg: `HATS ARE COOL ${id} ${logo}`
                    msg: `${data.entities[1]} to you too!`
                });
                break;
            case 'Help':
                    res.send({
                        msg: `I can only tell you a joke, the time, a randm fact, a random recipe, or the weather of today.`
                    });
                    break;
            case 'HRU':
                    res.send({
                        msg: `I am doing well thank you for asking`
                    });
                    break;
            case 'HRU':
                    res.send({
                        msg: `Its nice to meat you i am named ham all lowercase`
                    });
                    break;
            case 'Joke' :
                fetch(`https://official-joke-api.appspot.com/jokes/random`)
                    .then(res => res.text())
                    .then(body => res.send( { msg: `${JSON.parse(body).setup}\n \n....${JSON.parse(body).punchline}`}));
                break;
            case 'Fact' :
                fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
                    .then(res => res.text())
                    .then(body => res.send( { msg: `${JSON.parse(body).text}`}));
                break;
            case 'Meal' :
                fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                .then(res => res.text())
                .then(body => {
                    x = [`${JSON.parse(body).meals[0].strIngredient1} : ${JSON.parse(body).meals[0].strMeasure1}`,
                    `${JSON.parse(body).meals[0].strIngredient2}    ${JSON.parse(body).meals[0].strMeasure2}`,
                    `${JSON.parse(body).meals[0].strIngredient3}    ${JSON.parse(body).meals[0].strMeasure3}`,
                    `${JSON.parse(body).meals[0].strIngredient4}    ${JSON.parse(body).meals[0].strMeasure4}`,
                    `${JSON.parse(body).meals[0].strIngredient5}    ${JSON.parse(body).meals[0].strMeasure5}`,
                    `${JSON.parse(body).meals[0].strIngredient6}    ${JSON.parse(body).meals[0].strMeasure6}`,
                    `${JSON.parse(body).meals[0].strIngredient7}    ${JSON.parse(body).meals[0].strMeasure7}`,
                    `${JSON.parse(body).meals[0].strIngredient8}    ${JSON.parse(body).meals[0].strMeasure8}`,
                    `${JSON.parse(body).meals[0].strIngredient9}    ${JSON.parse(body).meals[0].strMeasure9}`,
                    `${JSON.parse(body).meals[0].strIngredient10}    ${JSON.parse(body).meals[0].strMeasure10}`,
                    `${JSON.parse(body).meals[0].strIngredient11}    ${JSON.parse(body).meals[0].strMeasure11}`,
                    `${JSON.parse(body).meals[0].strIngredient12}    ${JSON.parse(body).meals[0].strMeasure12}`,
                    `${JSON.parse(body).meals[0].strIngredient13}    ${JSON.parse(body).meals[0].strMeasure13}`,
                    `${JSON.parse(body).meals[0].strIngredient14}    ${JSON.parse(body).meals[0].strMeasure14}`,
                    `${JSON.parse(body).meals[0].strIngredient15}    ${JSON.parse(body).meals[0].strMeasure15}`,
                    `${JSON.parse(body).meals[0].strIngredient16}    ${JSON.parse(body).meals[0].strMeasure16}`,
                    `${JSON.parse(body).meals[0].strIngredient17}    ${JSON.parse(body).meals[0].strMeasure17}`,
                    `${JSON.parse(body).meals[0].strIngredient18}    ${JSON.parse(body).meals[0].strMeasure18}`,
                    `${JSON.parse(body).meals[0].strIngredient19}    ${JSON.parse(body).meals[0].strMeasure19}`,
                    `${JSON.parse(body).meals[0].strIngredient20}    ${JSON.parse(body).meals[0].strMeasure20}`,
                ]
                val = 'ingredients:\n'
                x.forEach(element => {
                    if (element != `    `) {
                        val += `${element}\n`
                    }
                    
                });

                    res.send( { msg: `${JSON.parse(body).meals[0].strMeal}\n\n${val}\n${JSON.parse(body).meals[0].strInstructions}
\n`})});
                break;
            case 'WeatherForecast':
                if (latLon != 'undefined') {
                    fetch(`https://wttr.in/${latLon}?format=The+forcast+for+you+today+is:+%C+%c\nThe+tempature+is+%t.+it+feels+like+%f`)
                        .then(res => res.text())
                        .then(body => res.send({ msg: body}))
                } else {
                    res.send({ msg: 'no location provided'})
                }
                
                break;
            case 'Time' :
                if (latLon != 'undefined') {
                    fetch(`https://wttr.in/${latLon}?format=It's+%T+right+now`)
                        .then(res => res.text())
                        .then(body => res.send({ msg: body}))
                } else {
                    res.send({ msg: 'no location provided'})
                }
                    
                break;
            case 'Exit':
                res.send({
                    // msg: `HATS ARE COOL ${id} ${logo}`
                    msg: `Have a great day!`
                })
                break;
            default: {
                res.send({
                    // msg: `HATS ARE COOL ${id} ${logo}`
                    msg: `I don't know what you mean (...yet?))`
                });
            }
        }
    });

    

});





