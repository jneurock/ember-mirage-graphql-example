import { Factory } from 'miragejs';

export default Factory.extend({
  altName: (i) => `Alt ${i + 1}`,
  name: (i) => `Item ${i + 1}`,
});
