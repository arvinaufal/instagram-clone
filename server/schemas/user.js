const { hashPassword } = require("../helpers/bcryptjs");
const User = require("../models/user");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  }

  
  type Query {
    dummy: String
  }
  
  type Mutation {
    register( name: String, username: String, email: String, password: String): User
  }
`;

const resolvers = {
  Query: {
    dummy: () => {
      return 'this is just a dummy'
    }
  },
  Mutation: {
    register: async (_, { name, username, email, password }, { db }) => {
      try {
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({ name, username, email, password: hashedPassword, db });
        return newUser;
      } catch (error) { 
        console.log(error);
      }
    }
  }
};


module.exports = { typeDefs, resolvers };