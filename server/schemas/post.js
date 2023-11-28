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
    posts: async () => {
      return 'test'
    }
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl }, { authentication }) => {
      try {
        const { authorId } = await authentication();
        const newPost = await Post.create({ content, tags, imgUrl, authorId });
        
        return newPost;
      } catch (err) {
        throw err
      }
    }
  }
};


module.exports = { typeDefs, resolvers };