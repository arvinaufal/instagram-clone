const User = require('../models/user');

const authentication = async (req) => {
    const accessToken = req.headers.authorization.split(' ').at(-1);
    try {
        if (!accessToken) throw ({ name: "Unauthenticated" });
        const { id } = verifyToken(accessToken);
        const user = await User.findOne({ _id: id });
        if (!user) throw ({ name: "Unauthenticated" });

        return { id: user.id };
    } catch (error) {
        throw error;
    }
}

module.exports = authentication;