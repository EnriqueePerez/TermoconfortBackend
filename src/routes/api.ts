const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { loadFile } = require('graphql-import-files');

const typeDefs = loadFile('./src/lib/graphQL/schema.graphql');
const resolvers = require('../lib/graphQL/resolvers');

export function api(app: any): any {
  app.use(
    '/api',
    graphqlHTTP({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      resolvers: resolvers,
      graphiql: true,
    })
  );
}
