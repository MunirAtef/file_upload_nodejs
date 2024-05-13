
const ClientModel = require("./client_model");
// const AuthController = require("../auth/auth_controller");

class ClientsController {
    async getClients(req, res) {
        try {
            let users = await ClientModel.find({userId: req.userId});
            res.json(users);
        } catch (e) {
            console.log(e);
            res.writeHead(500);
            res.end(`Error: ${e.toString()}`);
        }
    }

    async getClientById(req, res) {
        try {
            const clientId = req.params["clientId"];
            let user = await ClientModel.findOne({_id: clientId, userId: req.userId});
            res.json(user)
        } catch (e) {
            res.writeHead(500);
            res.end(e.toString())
        }
    }

    async createClient(req, res) {
        try {
            // let userId = AuthController.verifyToken(req, res);
            // if (!userId) return;

            let body = req.body;
            body.userId = req.userId;
            let result = await ClientModel.insertMany([body]);
            console.log(result[0]["_id"].toString());
            res.end(result[0]["_id"].toString());
        } catch (e) {
            res.writeHead(500);
            res.end(e.toString())
        }
    }

    async deleteClient(req, res) {
        try {
            const clientId = req.params["id"];
            let result = await ClientModel.deleteOne({"_id": clientId});
            console.log(result);
            console.log(typeof result)
            res.json(result);
        } catch (e) {
            res.writeHead(500);
            res.end(e.toString())
        }
    }
}


module.exports = {ClientsController}

