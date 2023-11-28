const { hashPassword, comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { emailFormat, passwordValidation } = require("../helpers/validation");
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

        //validation unique email
        let emailExist = await User.getByEmail({ email });
        if (emailExist) {
          throw new GraphQLError('Email has been exist', {
            extensions: { code: 'Bad Request' },
          });
        }

        //validation unique username
        let usernameExist = await User.getByUsername({ username });
        if (usernameExist) {
          throw new GraphQLError('Username has been exist', {
            extensions: { code: 'Bad Request' },
          });
        }

        //validation email format
        const isEmail = emailFormat(email);
        if (!isEmail) {
          throw new GraphQLError('Use a valid Email format', {
            extensions: { code: 'Bad Request' },
          });
        }

        //validation password length
        const isMinLength = passwordValidation(password);
        if (!isMinLength) {
          throw new GraphQLError('Password min 5 characters', {
            extensions: { code: 'Bad Request' },
          });
        }

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