import { buildSchema } from 'graphql';

export default buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }
    schema {
        mutation: RootMutation
    }`);

// export default buildSchema(`
//     type TestData {
//         text: String!
//         views: Int!
//     }

//     type RootQuery {
//         hello: TestData!
//     }
//     schema {
//         query: RootQuery
//     }
//     `);

// function myBuildSchema() {
//   return buildSchema(`
//          type Query {
//       hello: String
//     }`);
// }

// export default {
//   myBuildSchema,
// };
