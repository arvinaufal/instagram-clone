const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");

class Post {
    static async getAll() {
        const Posts = getDB().collection("posts");
        const posts = await Posts.aggregate([
            {
              $sort: { createdAt: -1 }
            },
            {
              $lookup: {
                from: "users",
                let: { authorId: "$authorId" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$authorId"] }
                    }
                  },
                  {
                    $project: {
                      password: 0,
                      email: 0
                    }
                  }
                ],
                as: "author"
              }
            },
            {
                $project: {
                    "_id": 1,
                    "content": 1,
                    "tags": 1,
                    "imgUrl": 1,
                    "authorId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "author": { $arrayElemAt: ["$author", 0] },
                    "likes" : 1,
                    "comments" : 1
                }
            },
          ]).toArray();
        
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
        const Posts = getDB().collection("posts");

        const post = await Posts.aggregate([
            {
                $match: { _id: postId }
            },
            {
                $unwind: { path: "$comments", preserveNullAndEmptyArrays: true },
            },
            {
                $lookup: {
                    from: "users",
                    let: { authorId: "$comments.authorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$authorId"] }
                            }
                        },
                        {
                            $project: {
                                password: 0,
                                email: 0
                            }
                        }
                    ],
                    as: "comments.user"
                }
            },
            {
                $unwind: { path: "$likes", preserveNullAndEmptyArrays: true },
            },
            {
                $lookup: {
                    from: "users",
                    let: { authorId: "$likes.authorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$authorId"] }
                            }
                        },
                        {
                            $project: {
                                password: 0,
                                email: 0
                            }
                        }
                    ],
                    as: "likes.user"
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { authorId: "$authorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$authorId"] }
                            }
                        },
                        {
                            $project: {
                                password: 0,
                                email: 0
                            }
                        }
                    ],
                    as: "author"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    content: { $first: "$content" },
                    tags: { $first: "$tags" },
                    imgUrl: { $first: "$imgUrl" },
                    authorId: { $first: "$authorId" },
                    author: { $first: "$author" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    likes: { $addToSet: "$likes" },
                    comments: { $push: "$comments" }
                }
            },
            {
                $project: {
                    "_id": 1,
                    "content": 1,
                    "tags": 1,
                    "imgUrl": 1,
                    "authorId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "author": { $arrayElemAt: ["$author", 0] },
                    "comments": {
                        $map: {
                            input: {
                                $ifNull: ["$comments", []]
                            },
                            as: "comment",
                            in: {
                                content: "$$comment.content",
                                authorId: "$$comment.authorId",
                                createdAt: "$$comment.createdAt",
                                updatedAt: "$$comment.updatedAt",
                                user: { $arrayElemAt: ["$$comment.user", 0] }
                            }
                        }
                    },
                    "likes": {
                        $map: {
                             input: {
                                $ifNull: ["$likes", []]
                            },
                            as: "like",
                            in: {
                                authorId: "$$like.authorId",
                                createdAt: "$$like.createdAt",
                                updatedAt: "$$like.updatedAt",
                                user: { $arrayElemAt: ["$$like.user", 0] }
                            }
                        }
                    }
                }
            },
        ]).toArray();

        return post[0];
    }
}

module.exports = Post;