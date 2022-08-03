const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }
    
    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        user(_id: ID, username:String):User
    }
    
    type Mutation {
        createUser(username: String!, email: String!, password: String!):User
    }
`;

module.exports = typeDefs;