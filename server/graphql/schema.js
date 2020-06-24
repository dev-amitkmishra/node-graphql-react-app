// const {} = require('');
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        status: String!
        posts: [Post!]!
    }
    type LoggedInUser {
        token: String!
        userId: String!
        status: Boolean!
    }

    type RootMutation {
        createUser(userInput: userInputData): User!
    }
    type RootQuery {
        hello: String
        login(loginInput: loginInputData): LoggedInUser!
        fetchUsers: [User!]!
    }
    input loginInputData {
        email: String!
        password: String!
    }
    input userInputData {
        email: String!
        name: String!
        password: String!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)