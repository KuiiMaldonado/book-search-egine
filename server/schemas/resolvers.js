const {User, Book} = require('../models');
const {signToken} = require("../utils/auth");
const {AuthenticationError} = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(`Query me: ${context._id}`)
            if (context.user) {
                return await User.findById(context._id).exec();
            }
            throw new AuthenticationError('Cannot find a user with this id!');
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        }
    }
};

module.exports = resolvers;