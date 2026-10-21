const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const pathFile = require('path')

const express = require('express')
const app = express();

const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.static(pathFile.join(__dirname, "files")));

app.post('/showNumbers', (req, res) => {
    if (req.body.number1 === '' || req.body.number2 === '') {
        return res.send(`<html>
            <head>
                <title>ExNodeJS23</title>
            </head>
            <body>
                <p>Invalid values</p>
                <a href="/index.html">Back to main page</a>
            </body>
        </html>`);
    }

    const number1 = Number(req.body.number1);
    const number2 = Number(req.body.number2);

    if (isNaN(number1) || isNaN(number2) || !Number.isInteger(number1) || !Number.isInteger(number2) || number1 > number2 || (number1 === 0 && number2 === 0)
    ) {
        return res.send(`<html>
            <head>
                <title>ExNodeJS23</title>
            </head>
            <body>
                <p>Invalid values</p>
                <a href="/index.html">Back to main page</a>
            </body>
        </html>`);
    }

    let numbersTable = ``;
    for (let i = number1; i <= number2; i++){
        numbersTable += `<a href='/showTable?value=${i}'>${i}</a><br>`;
    } 
    const page = `
    <html>
        <head>
            <title>ExNodeJS23</title>
        </head>
        <body>
            ${numbersTable}
        </body>
    </html>
    `;
    res.send(page);
});

app.get('/showTable', (req, res) => {
    if (!req.query.value || req.query.value === '') {
        return res.send(`<html>
            <head>
                <title>ExNodeJS23</title>
            </head>
            <body>
                <p>Invalid values</p>
                <a href="/index.html">Back to main page</a>
            </body>
        </html>`);
    }

    const number = Number(req.query.value);

    if (isNaN(number) || !Number.isInteger(number)) {
        return res.send(`<html>
            <head>
                <title>ExNodeJS23</title>
            </head>
            <body>
                <p>Invalid values</p>
                <a href="/index.html">Back to main page</a>
            </body>
        </html>`);
    }

    let table = ``;
    for (let i = 1; i <= 10; i++){
        table += `${number} * ${i} = ${number * i}<br>`;
    }
    table += `<br><a href="/index.html">Back to main page</a>`;
    res.send(table);
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
});
