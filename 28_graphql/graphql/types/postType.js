export default 
`  type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }

    input PostInputData {
        title: String!
        content: String!
        imageUrl: String!
    }

    type Mutation {
        createPost(postInput :PostInputData): Post!
    }

    type Query {
        posts: PostData!
    }
`;
