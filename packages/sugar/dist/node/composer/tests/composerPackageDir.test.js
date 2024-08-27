import __composerPackageDir from '../composerPackageDir';
describe('sugar.node.composer.composerPackageDir', () => {
    it('should return the current package composer.json path', () => {
        const path = __composerPackageDir('.');
        console.log(path);
    });
    it('should throw an error if the requested package does not exists', () => {
        expect(() => {
            __composerPackageDir('lotsof/sugar');
        }).toThrow();
    });
    it('should not throw an error if the requested package does not exists and that we have setted the checkExistance setting to false', () => {
        expect(() => {
            __composerPackageDir('lotsof/sugar', {
                checkExistence: false,
            });
        }).not.toThrow();
    });
    it('should return the correct package path for the sugar package', () => {
        const path = __composerPackageDir('lotsof/sugar', {
            checkExistence: false,
        });
        expect(path.includes('sugar/vendor/lotsof/sugar')).toBe(true);
    });
});
//# sourceMappingURL=composerPackageDir.test.js.map