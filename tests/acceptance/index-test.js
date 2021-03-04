import createGraphQLHandler from 'mirage-gql-resolver-test/mirage/handlers/graphql';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { visit } from '@ember/test-helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.server.createList('item', 2);
  });

  test('it renders a list of items', async function (assert) {
    await visit('/');

    assert.dom('.item:nth-child(1) .item__name').hasText('Item 1');
    assert.dom('.item:nth-child(1) .item__alt-name').hasText('(aka Alt 1)');
    assert.dom('.item:nth-child(2) .item__name').hasText('Item 2');
    assert.dom('.item:nth-child(2) .item__alt-name').hasText('(aka Alt 2)');
  });

  test('it can render error messages', async function (assert) {
    this.server.post(
      '/graphql',
      createGraphQLHandler(this.server.schema, {
        Query: {
          items() {
            throw new Error('foo');
          },
        },
      })
    );

    await visit('/');

    assert.dom('.error').hasText('foo');
  });

  test('it can render items without alt names', async function (assert) {
    this.server.post(
      '/graphql',
      createGraphQLHandler(this.server.schema, {
        Query: {
          items: () => [
            {
              name: 'Item 1',
            },
            {
              name: 'Item 2',
            },
          ],
        },
      })
    );

    await visit('/');

    assert.dom('.item:nth-child(1)').hasText('Item 1');
    assert.dom('.item:nth-child(2)').hasText('Item 2');
  });

  test('it can render one item', async function (assert) {
    this.server.db.items.remove();
    this.server.create('item');

    await visit('/');

    assert.dom('.item').exists({ count: 1 });
    assert.dom('.item:nth-child(1) .item__name').hasText('Item 3');
    assert.dom('.item:nth-child(1) .item__alt-name').hasText('(aka Alt 3)');
  });
});
