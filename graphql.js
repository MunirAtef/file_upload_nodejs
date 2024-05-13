
const express = require("express")
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = require("graphql/index");
const {GraphQLID, GraphQLList} = require("graphql/type");
const {graphqlHTTP} = require("express-graphql");
const UserModel = require("./routes/auth/auth_model")
const AuthController = require("./routes/auth/auth_controller");

const graphRouter = express.Router();


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString }
    }),
});


const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        name: { type: GraphQLString },
        userId: { type: GraphQLString },
        type: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        // createdAt: { type: GraphQLObjectType() },
        categories: { type: GraphQLList(GraphQLString) },
        address: {
            note: {
                type: GraphQLString
            },
            governorate: {
                type: GraphQLString
            },
            city: {
                type: GraphQLString
            }
        }
    }),
});




const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve: async () => {
                return UserModel.find({});
            },
        },

        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: async (_, { id }) => {
                return UserModel.findById(id);
            },
        },


    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: async (_, { name, email, password }) => {
                const user = new UserModel({ name, email, password });
                let result = await user.save();
                console.log(user);
                console.log(result);
                user.token = AuthController.createToken(user["_id"]);
                return user;
            },
        },

        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve: async (_, { id, name, email }) => {
                return UserModel.findByIdAndUpdate(id, {$set: {name, email}}, {new: true});
            },
        },

        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: async (parent, { id }) => {
                return UserModel.findByIdAndDelete(id);
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

graphRouter.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));

module.exports = graphRouter;