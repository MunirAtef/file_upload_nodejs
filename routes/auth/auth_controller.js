
const UserModel = require('./auth_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require("fs")
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


class AuthController {
    async registerWithEmail(req, res) {
        try {
            let body = req.body;

            let user = new UserModel({
                name: body["name"],
                email: body["email"],
                password: body["password"]
            });

            let result = await user.save();
            res.json(AuthController.setResponse(result));
            fs.mkdirSync(`uploads/${result["_id"]}`)
        } catch (e) {
            res.status(500).send(e.toString())
        }
    }

    async loginWithEmail(req, res) {
        let body = req.body;
        let email = body["email"];
        let password = body["password"];

        let result = await UserModel.findOne({
            "email": email
        });

        if (result === null) {
            res.writeHead(404);
            res.end("email-not-found");
            return;
        }

        const match = await bcrypt.compare(password, result["password"]);

        if (!match) {
            res.writeHead(401);
            res.end("invalid-password");
            return;
        }

        res.json(AuthController.setResponse(result));

        // res.json({
        //     id: result["_id"],
        //     name: result["name"],
        //     email: result["email"],
        //     token: this.getToken(result["_id"]),
        //     role: result["role"]
        // });
    }

    async getAllUsers(req, res) {
        let result = await UserModel.find({});
        res.json(result);
    }

    static setResponse(dbFormat) {
        return {
            id: dbFormat["_id"],
            name: dbFormat["name"],
            email: dbFormat["email"],
            token: AuthController.createToken(dbFormat["_id"]),
            role: dbFormat["role"]
        }
    }

    static createToken(id) {
        return jwt.sign({id: id}, secretKey);
    }

    static verifyToken(req, res, next) {
        if (req.path.startsWith('/auth') || req.path.startsWith('/graphql')) {
            next();
            return;
        }
        try {
            let tokenParts = req.header("Authorization").split(' ');
            let token = tokenParts[tokenParts.length - 1];
            let tokenObject = jwt.verify(token, secretKey);

            let userId = tokenObject["id"];
            if (userId) {
                req.userId = userId;
                next()
            } else {
                res.status(401).send("provide-correct-token");
            }
        } catch (e) {
            res.status(401).send("provide-correct-token");
            return null;
        }
    }
}


// function convertTime(timestamp) {
//     const date = new Date(timestamp * 1000);
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const day = date.getDay();
//     const hours = date.getHours();
//     const minutes = "" + date.getMinutes();
//
//     return `${year}/${month}/${day} ${hours}:${minutes}`;
// }

module.exports = AuthController;
