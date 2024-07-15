import { buildSchema } from 'graphql';

export default buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData!
    }
    schema {
        query: RootQuery
    }
    `);

// function myBuildSchema() {
//   return buildSchema(`
//          type Query {
//       hello: String
//     }`);
// }

// export default {
//   myBuildSchema,
// };
