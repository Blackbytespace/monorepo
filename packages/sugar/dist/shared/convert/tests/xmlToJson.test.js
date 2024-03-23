import __xmlToJson from '../xmlTojson.js';
describe('sugar.shared.convert.xmlToJson', () => {
    it('Should convert the passed xml string to a json object correctly', () => {
        const xml = `
            <root>
                <hello>world</hello>
            </root>
        `;
        const json = __xmlToJson(xml);
        expect(json).toEqual({
            root: {
                hello: 'world',
            },
        });
    });
});
//# sourceMappingURL=xmlToJson.test.js.map