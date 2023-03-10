const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    IsInTheaters: Boolean
  }

  type Query {
    users: [User]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = COLOMBIA
  }

  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    COLOMBIA
  }
`

module.exports = { typeDefs }

// query GetUser($userId: ID!) {
//   user(id: $userId) {
//     id
//     name
//     nationality
//     friends {
//       name
//     }
//   }
// }

// variables: mutation
// {
//   "createUserInput": {
//     "name": "Cristian",
//     "username": "creea",
//     "age": 38
//   }
// }

// mutation updateUsername($input: UpdateUsernameInput!) {
//   updateUsername(input: $input) {
//     id
//     name
//     username
//   }
// }
// variables
// {
//   "input": {
//     "id": "1",
//     "newUsername": "epa pues"
//   }
// }

// mutation($deleteUserId: ID!) {
//   deleteUser(id: $deleteUserId) {
//     id
//   }
// }

// variables
// {
//   "deleteUserId": "4"
// }
