import __packageJsonSync from '../packageJsonSync';

describe('sugar.node.package.packageJsonSync', () => {
  it('should return the package.json correctly for the current package "."', () => {
    const json = __packageJsonSync('.');
    expect(json.name).toBe('@blackbyte/sugar');
  });
  //   it('should return the composer.json correctly for the "psr/log" package', () => {
  //     const json = __packageJsonSync('psr/log');
  //     expect(json.name).toBe('psr/log');
  //   });
});
