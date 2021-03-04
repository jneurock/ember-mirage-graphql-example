import createGraphQLHandler from './handlers/graphql';

export default function () {
  this.post('/graphql', createGraphQLHandler(this.schema));
}
