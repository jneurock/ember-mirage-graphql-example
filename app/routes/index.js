import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'mirage-gql-resolver-test/gql/queries/items.gql';

export default class IndexRoute extends Route {
  @queryManager apollo;

  async model() {
    let model;

    try {
      model = await this.apollo.watchQuery({ query });
    } catch (ex) {
      model = { error: ex.message };
    }

    return model;
  }
}
