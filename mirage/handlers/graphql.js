import graphQLSchema from 'mirage-gql-resolver-test/gql/schema.gql';
import { createGraphQLHandler } from '@miragejs/graphql';

export default function (mirageSchema, customResolvers) {
  return createGraphQLHandler(graphQLSchema, mirageSchema, {
    resolvers: {
      // Configure default resolvers here...
      ...customResolvers,
    },
  });
}
