const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");

class Post {
    static async getAll() {
        const Posts = getDB().collection("posts");
        const posts = await Posts.find().toArray();

        return posts;
    }

    static async create({ content, tags, imgUrl, authorId }) {
        const date = new Date();
        let newPost = { content, tags, imgUrl, authorId, createdAt: date, updatedAt: date };
        const Posts = getDB().collection("posts");
        await Posts.insertOne(newPost);

        return newPost;
    }

    static async addComment({ content, postId, authorId }) {
        const date = new Date();
        let newComment = { content, authorId, createdAt: date, updatedAt: date };
        const Posts = getDB().collection('posts');
        await Posts.findOneAndUpdate({ _id: postId }, { $addToSet: { comments: newComment } });

        return newComment;
    }

    static async getDetail({ postId }) {
        try {
            const Posts = getDB().collection("posts");
            const post = await Posts.findOne({ _id: postId });

            return post;
        } catch (error) {
            throw error
        }
    }
}

module.exports = Post;