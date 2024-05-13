
const express = require('express');
const {ClientsController} = require("./clients_controller");

const clientsRouter = express.Router();

let controller = new ClientsController()

clientsRouter
    .get('/', controller.getClients)
    .post('/', controller.createClient)
    .get('/:userId', controller.getClientById)
    .delete('/:userId', controller.deleteClient);

module.exports = clientsRouter;
