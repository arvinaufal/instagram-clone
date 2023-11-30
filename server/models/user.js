const { getDB } = require("../config/mongo");

class User {
    static async create({ name, username, email, password }) {
        let newUser = { name, username, email, password };
        const Users = getDB().collection("users");
        const insertUser = await Users.insertOne(newUser);
        // newUser.id = insertUser.insertedId;

        return newUser;
    }

    static async getByUsername({ username }) {
        const Users = getDB().collection("users");
        const user = await Users.findOne({ username });

        return user;
    }

    static async getByEmail({ email }) {
        const Users = getDB().collection("users");
        const user = await Users.findOne({ email });

        return user;
    }

    static async getById({ id }) {
        const Users = getDB().collection("users");
        // const user = await Users.findOne({ _id: id });
        const user = await Users.aggregate([
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: "follows",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$followerId", "$$userId"] }
                            }
                        },
                    ],
                    as: "followsEr"
                }
            },
            {
                $lookup: {
                    from: "follows",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$followingId", "$$userId"] }
                            }
                        },
                    ],
                    as: "followsIng"
                }
            },
            {
                $unwind: { path: "$followsEr", preserveNullAndEmptyArrays: true },
            },
            {
                $unwind: { path: "$followsIng", preserveNullAndEmptyArrays: true },
            },
            {
                $lookup: {
                    from: "users",
                    let: { userId: "$followsIng.followerId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$userId"] }
                            }
                        },
                        {
                            $project: {
                                password: 0,
                                email: 0
                            }
                        }
                    ],
                    as: "followings"
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { userId: "$followsEr.followingId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$userId"] }
                            }
                        },
                        {
                            $project: {
                                password: 0,
                                email: 0
                            }
                        }
                    ],
                    as: "followers"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    username: { $first: "$username" },
                    email: { $first: "$email" },
                    followers: { $addToSet: "$followers" },
                    followings: { $addToSet: "$followings" }
                }
            },
            {
                $project: {
                    "_id": 1,
                    "name": 1,
                    "username": 1,
                    "email": 1,
                    "followers": {
                        $map: {
                            input: "$followers",
                            as: "follower",
                            in: {
                                _id: { $arrayElemAt: ["$$follower._id", 0] },
                                name: { $arrayElemAt: ["$$follower.name", 0] },
                                username: { $arrayElemAt: ["$$follower.username", 0] },
                            }
                        }
                    },
                    "followings": {
                        $map: {
                            input: "$followings",
                            as: "following",
                            in: {
                                _id: { $arrayElemAt: ["$$following._id", 0] },
                                name: { $arrayElemAt: ["$$following.name", 0] },
                                username: { $arrayElemAt: ["$$following.username", 0] },
                            }
                        }
                    }
                }
            },


        ]).toArray();

        return user[0];
    }

    static async getByQ({ q }) {
        const Users = getDB().collection('users');
        const users = await Users.find({
            $or: [
                { name: { $regex: new RegExp(q, 'i') } },
                { username: { $regex: new RegExp(q, 'i') } }
            ]
        }).toArray();

        return users;
    }

    static async follow({ followingId, followerId }) {
        const date = new Date();

        const Follow = getDB().collection('follows');
        const newFollow = { followingId, followerId, createdAt: date, updatedAt: date };
        await Follow.insertOne(newFollow);

        return newFollow;
    }

    static async getFollowing({ followingId, followerId }) {
        const Follow = getDB().collection('follows');
        const following = await Follow.findOne({ $and: [{ followingId }, { followerId }] });
        return !following ? false : following;
    }

    static async unfollow({ followingId, followerId }) {
        const Follow = getDB().collection('follows');
        await Follow.deleteOne({ $and: [{ followingId }, { followerId }] });
    }

    static async getLiked({ authorId, postId }) {
        const Post = getDB().collection('posts');
        const post = await Post.findOne({ _id: postId });
        if (!post.likes) return false;
        if (post.likes.length < 1) return false;
        const liked = post.likes.find((el) => el.authorId.toString() === authorId.toString());   
        if (!liked) return false;

        return liked;
    }

    static async like({ authorId, postId }) {
        const date = new Date();

        const Post = getDB().collection('posts');
        const newLike = { authorId, createdAt: date, updatedAt: date };
        await Post.findOneAndUpdate({ _id: postId }, { $addToSet: { likes: newLike } });

        return newLike;
    }

    static async unlike({ authorId, postId }) {
        const Post = getDB().collection('posts');
        await Post.updateOne(
            { _id: postId },
            { $pull: { likes: { authorId } } }
        );
    }
}

module.exports = User;