const { GraphQLError } = require('graphql');
const { verifyToken } = require('../helpers/jwt');
const User = require('../models/user');
const { ObjectId } = require('mongodb');

const authentication = async (req) => {
    if (!req.headers.authorization) {
        throw new GraphQLError('Invalid Token', {
            extensions: { code: 'Unauthenticated' },
        });
    }
    const accessToken = req.headers.authorization.split(' ').at(-1);

    try {
        if (!accessToken) {
            throw new GraphQLError('Invalid Token', {
                extensions: { code: 'Unauthenticated' },
            });
        }
        const { userId } = verifyToken(accessToken);
        const user = await User.getById({ id: new ObjectId(userId) });
        if (!user) {
            throw new GraphQLError('Invalid Token', {
                extensions: { code: 'Unauthenticated' },
            });
        }

        return { authorId: userId };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = authentication;