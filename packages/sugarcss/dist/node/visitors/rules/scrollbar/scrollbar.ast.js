export default function (size, thumb, track) {
    return [
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
                            property: 'width',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'dimension',
                                    value: size.value,
                                },
                            },
                        },
                        {
                            property: 'height',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'dimension',
                                    value: size.value,
                                },
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 4,
                    line: 1,
                    column: 3,
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
                            value: 'track',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'background-color',
                                },
                                value: [track],
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 4,
                    line: 5,
                    column: 3,
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
                            value: 'thumb',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'background-color',
                                },
                                value: [thumb],
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 4,
                    line: 8,
                    column: 3,
                },
            },
        },
    ];
}
//# sourceMappingURL=scrollbar.ast.js.map