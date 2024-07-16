import { mergeTypeDefs } from '@graphql-tools/merge';
import { buildSchema, print } from 'graphql';
// import fs from 'fs';

import postType from './types/postType.js';
import userType from './types/userType.js';

const types = [postType, userType];
const typeDefs = mergeTypeDefs(types);
const printedTypeDefs = print(typeDefs);
// fs.writeFileSync('joined.graphql', printedTypeDefs);

export default buildSchema(printedTypeDefs);

// export default buildSchema(`
//     type Post {
//         _id: ID!
//         title: String!
//         content: String!
//         imageUrl: String!
//         creator: User!
//         createdAt: String!
//         updatedAt: String!
//     }

//     type User {
//         _id: ID!
//         name: String!
//         email: String!
//         password: String
//         status: String!
//         posts: [Post!]!
//     }

//     type AuthData {
//         token: String!
//         userId: String!
//     }

//     type PostData {
//         posts: [Post!]!
//         totalPosts: Int!
//     }

//     input UserInputData {
//         email: String!
//         name: String!
//         password: String!
//     }

//     input PostInputData {
//         title: String!
//         content: String!
//         imageUrl: String!
//     }

//     type RootMutation {
//         createUser(userInput: UserInputData): User!
//         createPost(postInput :PostInputData): Post!
//     }

//     type RootQuery {
//         login(email: String!, password: String!): AuthData!
//         posts: PostData!
//     }
//     schema {
//         query: RootQuery
//         mutation: RootMutation
//     }`);

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
