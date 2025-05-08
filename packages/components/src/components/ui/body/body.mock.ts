import { __bodyMock } from '@lotsof/types';
export default () => {
  const mock = __bodyMock().toObject();
  return mock;
};
