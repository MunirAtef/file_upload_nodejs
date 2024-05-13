
const express = require('express');

const viewRouter = express.Router();


viewRouter.get('/', (req, res) => {
    res.contentType = "text/html";  //application

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    <button onclick="getAllUsers()">GET ALL USERS</button>
    <script>
        function getAllUsers() {
            
            fetch('localhost:3000/clients/').then(response => {
                if (response.ok) {
                    console.log("OKKKKKKKKK");
                    console.log(response.text())
                }
            });
            
            // let request = new XMLHttpRequest();
            // request.open('POST', 'localhost:3000/auth/users');
            // request.send();
            //
            // request.responseType = 'json'
            // request.onload = () => {
            //     console.log(request.status);
            //     console.log(request.responseText);
            // }
        }
    </script>
    </body>
    </html>
    `);
});

module.exports = viewRouter;

