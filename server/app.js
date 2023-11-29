if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schemas/user');
const { typeDefs: postTypeDefs, resolvers: postResolvers } = require('./schemas/post');
const { connect } = require('./config/mongo');
const { verifyToken } = require('./helpers/jwt');
const authentication = require('./middlewares/authentication');

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs],
    resolvers: [userResolvers, postResolvers]
});

connect().then(() => {
    return startStandaloneServer(server, {
        listen: { port: 3000 },
        // context: async ({ req, res }) => ({
        //     isAuthenticated: () => {
        //         const access_token = req.headers.authorization ? req.headers.authorization.split(' ').at(-1) : 'NotExist';
        //         return verifyToken(access_token);
        //     }
        // }),
        context: ({ req }) => {
            return {
                authentication: async () => await authentication(req),
            }
        }

    })
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});