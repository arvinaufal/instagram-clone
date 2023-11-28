class Post {
    static async create({ content, tags, imgUrl, authorId, comments, likes }) {
        try {
            const date = new Date();
            let newPost = { content, tags, imgUrl, authorId, comments, likes, createdAt: date, updatedAt: date };
            const Posts = db.collection("posts"); 
            const insertPost = await Posts.insertOne(newPost);
            newPost.id = insertPost.insertedId;
     
            return newPost;
        } catch (error) {
            throw error
        }
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