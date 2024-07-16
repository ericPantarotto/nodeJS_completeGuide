export default 
`   type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type Mutation {
        createUser(userInput: UserInputData): User!
    }

    type Query {
        login(email: String!, password: String!): AuthData!
    }`