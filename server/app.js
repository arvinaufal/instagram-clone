if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schemas/user');
const { connect } = require('./config/mongo');
const { verifyToken } = require('./helpers/jwt');

const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers]
});

startStandaloneServer(server, {
    listen: { port: 3000 },
    context: async ({ req, res }) => ({
        db: await connect(),
        isAuthenticated : () => {
            const access_token = req.headers.authorization ? req.headers.authorization.split(' ').at(-1) : 'NotExist';
            return verifyToken(access_token);
        }
    }), 
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});