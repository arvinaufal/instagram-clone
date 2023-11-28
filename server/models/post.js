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

    static async addComment({content, postId, authorId}) {
        const date = new Date();
        let newComment = { content, authorId, createdAt: date, updatedAt: date };
        const Posts = getDB().collection('posts');
        const test = await Posts.findOneAndUpdate({ _id: postId }, { $addToSet: { comments: newComment } });
        console.log({test});
        return newComment;
    }

    // static async getDetail({ username, db }) {
    //     try {
    //         const Users = db.collection("users"); 
    //         const user = await Users.findOne({username});

    //         return user;
    //     } catch (error) {
    //         throw error
    //     }
    // }
}

module.exports = Post;