export default function () {
    return [
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'custom',
                            value: {
                                name: '-ms-overflow-style',
                                value: [
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'ident',
                                            value: 'none',
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'custom',
                            value: {
                                name: 'scrollbar-width',
                                value: [
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'ident',
                                            value: 'none',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 4,
                    line: 0,
                    column: 19,
                },
            },
        },
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                        {
                            type: 'pseudo-element',
                            kind: 'webkit-scrollbar',
                            value: 'scrollbar',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'display',
                            value: {
                                type: 'keyword',
                                value: 'none',
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 4,
                    line: 4,
                    column: 3,
                },
            },
        },
    ];
}
//# sourceMappingURL=hide.ast.js.map