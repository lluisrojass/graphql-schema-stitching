const { 
  makeRemoteExecutableSchema, 
  introspectSchema, 
  mergeSchemas 
} = require('graphql-tools');
const { 
  createHttpLink 
} = require('apollo-link-http');
const { 
  ApolloServer 
} = require('apollo-server');
const services = require('./services');
const fetch = require('node-fetch');

const makeServiceLink = (uri) => createHttpLink({
  uri,
  fetch
});

async function makeRemoteSchemaFromServices() {
  const promises = services.map(service => {
    return (async () => {
      const schema = await introspectSchema(makeServiceLink(service.url));
      const executableSchema = makeRemoteExecutableSchema({
        schema,
        link: makeServiceLink(service.url)
      });
      return executableSchema;
    })();
  });

  const executableSchamas = await Promise.all(promises);
  const mergedSchemas = mergeSchemas({
    schemas: executableSchamas
  });
  return mergedSchemas;
}

const main = async () => {
  const remoteSchema = await makeRemoteSchemaFromServices();
  const server = new ApolloServer({
    schema: remoteSchema,
    introspect: true,
    playground: true,
    tracing: true
  });

  const port = 9000;
  server.listen(port).then(() => {
    console.log('servie server listening 🚀 on port ' + port);
  });
}

main();