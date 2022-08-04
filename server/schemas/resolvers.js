const {User, Book} = require('../models');
const {signToken} = require("../utils/auth");
const {AuthenticationError} = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id});
            }
            throw new AuthenticationError('Cannot find a user with this id!');
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async(parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('Can\'t find this user');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }

            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, args, context, bookToSave) => {
            const bookData = bookToSave.variableValues.bookToSave;
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: bookData}},
                {new: true}
            );
            console.log(updatedUser);
            // return input;
        }
    }
};

module.exports = resolvers;