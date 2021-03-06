import { Application, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { loadFile } from 'graphql-import-files';

const typeDefs = loadFile('./src/lib/graphQL/schema.graphql');
import resolvers from '../lib/graphQL/resolvers';

export function api(app: Application) {
  app.use(
    '/api',
    graphqlHTTP({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      rootValue: resolvers,
      graphiql: process.env.NODE_ENV !== 'production',
    })
  );

  app.get('/sleep', (req: Request, res: Response) => {
    res.status(200).json({ sleep: 'I am awake' });
  });
}
