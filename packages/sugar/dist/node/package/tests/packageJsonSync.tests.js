import composerJsonSync from '../composerJsonSync';
describe('sugar.node.package.packageJsonSync', () => {
    it('should return the package.json correctly for the current package "."', () => {
        const json = composerJsonSync('.');
        expect(json.name).toBe('@lotsof/sugar');
    });
    //   it('should return the composer.json correctly for the "psr/log" package', () => {
    //     const json = composerJsonSync('psr/log');
    //     expect(json.name).toBe('psr/log');
    //   });
});
//# sourceMappingURL=packageJsonSync.tests.js.map