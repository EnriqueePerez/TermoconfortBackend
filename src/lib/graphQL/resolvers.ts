import queries from './queries';
import mutations from './mutations';
import specialTypes from './specialTypesResolvers';
import { TimestampType } from './graphqlTimeStamp';

export = {
  Query: queries,
  Mutation: mutations,
  Timestamp: TimestampType,
  ...specialTypes,
};
