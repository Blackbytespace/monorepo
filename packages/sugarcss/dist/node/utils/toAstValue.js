export default function toAstValue(value) {
    if (typeof value === 'string') {
        return [
            {
                type: 'token',
                value: {
                    type: 'ident',
                    value: 'cc',
                },
            },
        ];
    }
    else if (typeof value === 'number') {
        return [
            {
                type: 'token',
                value: {
                    type: 'ident',
                    value: 'coco',
                },
                // type: 'length',
                // value: {
                //   unit: 'px',
                //   value,
                // },
            },
        ];
    }
}
//# sourceMappingURL=toAstValue.js.map