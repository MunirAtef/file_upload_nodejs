
const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const app = express();
require('dotenv').config();


const mongoConnection = require('./mongoConnection');
mongoConnection();



const authRouter = require("./routes/auth/auth_endpoints");
const clientsRouter = require("./routes/clients/clients_endpoints");
const viewRouter = require("./routes/views/view");
const backupRouter = require("./routes/file_upload/file_upload");
const graphRouter = require("./graphql")
const AuthController = require("./routes/auth/auth_controller");


app.use(express.json());
app.use(AuthController.verifyToken);
app.use("/clients", clientsRouter);
app.use("/auth", authRouter);
app.use("/view", viewRouter);
app.use("/backup", backupRouter);
app.use("/graphql", graphRouter);


const port = process.env.PORT;
app.listen(port, () => { console.log(`Server running at port ${port}`) });

