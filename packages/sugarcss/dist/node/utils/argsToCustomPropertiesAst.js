import { __dashCase } from '@lotsof/sugar/string';
export default function argsToCustomPropertiesAst(name, args) {
    const result = [];
    for (let [key, value] of Object.entries(args.ast)) {
        result.push({
            property: 'custom',
            value: {
                name: `${name}-${__dashCase(key)}`,
                value: [value],
            },
        });
    }
    return result;
}
//# sourceMappingURL=argsToCustomPropertiesAst.js.map