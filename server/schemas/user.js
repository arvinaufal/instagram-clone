const { hashPassword, comparePassword } = require("../helpers/bcryptjs");
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
    accessToken: String
  }

  type Query {
    getUser: String
  }
  
  type Mutation {
    login( username: String, password: String ): Token
    register( name: String, username: String, email: String, password: String): User
  }
`;

const resolvers = {
  Query: {
    getUser: () => {
      console.log('hello world')
    }
  },
  Mutation: {
    register: async (_, { name, username, email, password }, { db }) => {
      try {
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({ name, username, email, password: hashedPassword, db });
        return newUser;
      } catch (err) {
        throw err;
      }
    },

    login: async (_, { username, password }) => {
      try {
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
        const user = await User.getDetail({ username });

        if (!user) {
          throw new GraphQLError('User is not exist', {
            extensions: { code: 'Not Found' },
          });
        }

        const isMatch = comparePassword(password, user.password);

        if (!isMatch) {
          throw new GraphQLError('Invalid username/password', {
            extensions: { code: 'Unauthenticated' },
          });
        }

        return { accessToken: signToken({ UserId: user._id }) };
      } catch (err) {
        throw err;
      }
    }
  }
};


module.exports = { typeDefs, resolvers };