const {User, Book} = require('../models');
const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        user: async (parent, {_id, username}) => {
            return User.find({});
        }
    },
    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        }
    }
};

module.exports = resolvers;