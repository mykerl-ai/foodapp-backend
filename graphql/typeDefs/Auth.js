const Auth = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    token: String
    createdAt: DateTime
    updatedAt:DateTime
  }

  input RegisterInput {
    username: String
    email: String
    password: String!
  }

  input LoginInput {
    username: String
    email: String
    password: String!
  }

  type Query {
    ListUsers: [User]!
    GetUserById(id: ID!): User!
  }

  type Mutation {
    RegisterUser(RegisterInput: RegisterInput!): User!
    LoginUser(LoginInput: LoginInput!): User!
  }
`;

module.exports = Auth;
