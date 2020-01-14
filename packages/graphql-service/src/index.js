const gql = require('graphql-tag');
const dataStore = require('./data-store.js');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server');
  
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    favoriteColors: [Color]!
  }
  type Color {
    id: ID!
    hex: String
    rgb: String
  }
  type Query {
    getUser(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    getUser: (_, args, context, info) => dataStore.getUserById(args.id)
  },
  User: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    favoriteColors: (parent) => dataStore.getColorsFromColorIds(parent.favoriteColors)
  },
  Color: {
    id: parent => parent.id,
    hex: parent => parent.hex,
    rgb: parent => parent.rgb
  }
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  tracing: true
});

const port = 8080;

server.listen(port).then(() => {
  console.log('servie server listening 🚀 on port ' + port);
});
