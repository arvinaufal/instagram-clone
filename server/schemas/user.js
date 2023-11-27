const { BSON } = require("mongodb");
const { hashPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
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

  type Token {
    access_token: String
  }

  type Query {
    login( username: String, password: String ): Token
  }
  
  type Mutation {
    register( name: String, username: String, email: String, password: String): User
  }
`;

const resolvers = {
  Query: {
    login: async (_, { username, password }, { db }) => {
      if (!username || username == '') {
        throw new GraphQLError('Username is required', {
          extensions: { code: 'Bad Request' },
        });
      }

      if (!password || password == '') {
        throw new GraphQLError('Password is required', {
          extensions: { code: 'Bad Request' },
        });
      }
      
      const hashedPassword = hashPassword(password);
      const user = await User.getDetail({ username, password: hashedPassword, db });
      if (user) {
        const token = signToken({ id: user.id });

        return { access_token: token };
      } else {
        throw new GraphQLError('Invalid username/password', {
          extensions: { code: 'Unauthenticated' },
        });
      }
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