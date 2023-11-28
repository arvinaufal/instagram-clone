const User = require('../models/user');

const authentication = async (token) => {
    try {
        if (!token) throw ({ name: "Unauthenticated" });
        const { id } = verifyToken(token);
        const user = await User.findOne({ _id: id });
        if (!user) throw ({ name: "Unauthenticated" });

        return { id: user.id };
    } catch (error) {
        throw error;
    }
}

module.exports = authentication;