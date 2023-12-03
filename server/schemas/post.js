const { ObjectId } = require("mongodb");
const { hashPassword, comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const authentication = require("../middlewares/authentication");
const Post = require("../models/post");
const { GraphQLError } = require("graphql");
const redis = require("../config/redis");

const typeDefs = `#graphql
  type UserRef {
    _id: ID
    name: String
    username: String!
  }

  type Comments {
    content: String!
    authorId: ID!
    createdAt: String
    updatedAt: String
    user: UserRef
  }

  type Likes {
    authorId: ID!
    createdAt: String
    updatedAt: String
    user: UserRef
  }

  type CommentsRef {
    content: String
    authorId: ID
    createdAt: String
    updatedAt: String
    user: UserRef
  }

  type LikesRef {
    authorId: ID
    createdAt: String
    updatedAt: String
    user: UserRef
  }

  input CommentsInput {
    content: String!
    authorId: ID!
    createdAt: String
    updatedAt: String
  }

  input LikesInput {
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
    comments: [CommentsRef]
    likes: [LikesRef]
    createdAt: String
    updatedAt: String
    author: UserRef
    isLiked: String
  }

  type Query {
    posts: [Post]
    postsById(postId: String): Post
  }
  
  type Mutation {
    addPost( 
      content: String,
      tags: [String],
      imgUrl: String,
      comments: [CommentsInput],
      likes: [LikesInput],
    ): Post

    addComment(
      content: String
      postId: ID
    ): Comments
  }
`;

const resolvers = {
  Query: {
    posts: async (_, __, { authentication }) => {
      try {
        const { authorId } = await authentication();
        const postsCache = await redis.get(`${authorId}:posts:all`);
        let res;

        if (postsCache) {
          res = JSON.parse(postsCache);
        } else {

          const posts = await Post.getAll();
          await redis.set(`${authorId}:posts:all`, JSON.stringify(posts));

          res = posts;
        }

        return res;
      } catch (err) {
        throw err;
      }
    },
    postsById: async (_, { postId }, { authentication }) => {
      try {
        const { authorId } = await authentication();
        const post = await Post.getDetail({ postId: new ObjectId(postId) });
        if (post.likes.length > 0) {
          if (!post.likes[0].authorId) {
            post.likes = null;
          }
        }else{
          post.likes = null;
        }

        if (post.comments.length > 0) {
          if (!post.comments[0].authorId) {
            post.comments = null;
          }
        }else{
          post.comments = null;
        }

        if (post.likes !== null) {
          const like = post.likes.find(el => el.authorId.toString() === authorId);
          if (like) {
            post.isLiked = "true";
          }else{
            post.isLiked = "false";
          }
        }else{
          post.isLiked = "false";
        }
      
        return post;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl }, { authentication }) => {
      try {
        const cleanedTags = tags[0].replace(/#/g, '');
        const formattedTags = cleanedTags.split(' ');
        const { authorId } = await authentication();
        const newPost = await Post.create({ content, tags: formattedTags, imgUrl, authorId: new ObjectId(authorId) });
        await redis.del(`${authorId}:posts:all`);

        return newPost;
      } catch (err) {
        throw err;
      }
    },
    addComment: async (_, { content, postId }, { authentication }) => {
      try {
        const { authorId } = await authentication();
        const newComment = await Post.addComment({ content, postId: new ObjectId(postId), authorId: new ObjectId(authorId) });

        return newComment;
      } catch (err) {
        throw err;
      }
    }
  }
};


module.exports = { typeDefs, resolvers };