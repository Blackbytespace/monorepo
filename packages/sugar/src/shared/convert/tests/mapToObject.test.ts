import __mapToObject from '../mapToObject';

describe('sugar.shared.convert.__mapToObject', () => {
  it('Should convert a map to an object correctly', () => {
    const myMap = new Map();
    myMap.set('hello', 'world');
    expect(__mapToObject(myMap)).toEqual({
      hello: 'world',
    });
  });
});
