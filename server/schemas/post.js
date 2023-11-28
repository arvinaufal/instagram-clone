const { hashPassword, comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const Post = require("../models/post");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
  type Comments {
    content: String!
    authorId: ID!
    createdAt: String
    updatedAt: String
  }

  type Likes {
    authorId: ID!
    createdAt: String
    updatedAt: String
  }

  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
  }
  
  type Mutation {
    addPost( 
      content: String,
      tags: [String],
      imgUrl: String,
      authorId: String,
      # comments: Array,
      # likes: Array,
    ): Post
  }
`;

const resolvers = {
  Query: {
    posts: async() => {
      return 'test'
    }
  },
  Mutation: {
    addPost: async (_, {  content, tags, imgUrl, authorId, }, { db, isAuthenticated }) => {
      try {
        console.log(isAuthenticated);
        // const hashedPassword = hashPassword(password);
        // const newUser = await User.create({ name, username, email, password: hashedPassword, db });
        // return newUser;
      } catch (error) {
        console.log(error);
      }
    }
  }
};


module.exports = { typeDefs, resolvers };