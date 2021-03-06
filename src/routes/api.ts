import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { loadFile } from 'graphql-import-files';

const typeDefs = loadFile('./src/lib/graphQL/schema.graphql');
import resolvers from '../lib/graphQL/resolvers';

export function api(app: any): any {
  app.use(
    '/api',
    graphqlHTTP({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      rootValue: resolvers,
      graphiql: true,
    })
  );
}
