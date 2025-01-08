export default function gridAst(gridArgs) {
    const a = {
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
                        property: 'display',
                        value: {
                            type: 'pair',
                            outside: 'block',
                            inside: {
                                type: 'grid',
                            },
                            isListItem: false,
                        },
                    },
                    {
                        property: 'grid-template-columns',
                        value: {
                            type: 'track-list',
                            lineNames: [
                                ...gridArgs.cols.map((col) => {
                                    return [];
                                }),
                                [],
                            ],
                            items: gridArgs.cols.map((col) => {
                                return {
                                    type: 'track-size',
                                    value: {
                                        type: 'track-breadth',
                                        value: {
                                            type: 'flex',
                                            value: 1,
                                        },
                                    },
                                };
                            }),
                        },
                    },
                    {
                        property: 'grid-template-rows',
                        value: {
                            type: 'track-list',
                            lineNames: [[]],
                            items: [
                                {
                                    type: 'track-size',
                                    value: {
                                        type: 'track-breadth',
                                        value: {
                                            type: 'auto',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            rules: gridArgs.areas.map((areaId) => {
                return {
                    type: 'style',
                    value: {
                        selectors: [
                            [
                                {
                                    type: 'nesting',
                                },
                                {
                                    type: 'combinator',
                                    value: 'child',
                                },
                                {
                                    type: 'universal',
                                },
                                {
                                    type: 'pseudo-class',
                                    kind: 'nth-child',
                                    a: 0,
                                    b: parseInt(areaId),
                                    of: null,
                                },
                            ],
                        ],
                        declarations: {
                            importantDeclarations: [],
                            declarations: [
                                {
                                    property: 'custom',
                                    value: {
                                        name: 'grid-column-start',
                                        value: [
                                            {
                                                type: 'token',
                                                value: {
                                                    type: 'number',
                                                    value: gridArgs.colsStartByArea[areaId],
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    property: 'custom',
                                    value: {
                                        name: 'grid-column-end',
                                        value: [
                                            {
                                                type: 'token',
                                                value: {
                                                    type: 'number',
                                                    value: gridArgs.colsEndByArea[areaId] + 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    property: 'grid-row-start',
                                    value: {
                                        type: 'line',
                                        index: gridArgs.rowsStartByArea[areaId],
                                        name: null,
                                    },
                                },
                                {
                                    property: 'grid-row-end',
                                    value: {
                                        type: 'line',
                                        index: gridArgs.rowsEndByArea[areaId] + 1,
                                        name: null,
                                    },
                                },
                            ],
                        },
                        rules: [],
                        loc: {
                            source_index: 0,
                            line: 9,
                            column: 5,
                        },
                    },
                };
            }),
            loc: {
                source_index: 4,
                line: 0,
                column: 19,
            },
        },
    };
    if (gridArgs.gap) {
        a.value.declarations.declarations.push({
            property: 'unparsed',
            value: {
                // @ts-ignore
                propertyId: {
                    property: 'gap',
                },
                value: [gridArgs.gap],
            },
        });
    }
    return a;
}
//# sourceMappingURL=grid.ast.js.map