const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schemas/user');

const server = new ApolloServer({
    typeDefs: [],
    resolvers: []
});

startStandaloneServer(server, {
    listen: { port: 3000 },
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});