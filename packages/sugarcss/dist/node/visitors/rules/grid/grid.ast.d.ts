export type TSugarCssGridAstArgs = {
    cols: string[];
    areas: string[];
    colsStartByArea: Record<string, number>;
    colsEndByArea: Record<string, number>;
    rowsStartByArea: Record<string, number>;
    rowsEndByArea: Record<string, number>;
    gap: any;
};
export default function gridAst(gridArgs: TSugarCssGridAstArgs): {
    type: string;
    value: {
        selectors: {
            type: string;
        }[][];
        declarations: {
            importantDeclarations: never[];
            declarations: ({
                property: string;
                value: {
                    type: string;
                    outside: string;
                    inside: {
                        type: string;
                    };
                    isListItem: boolean;
                    lineNames?: undefined;
                    items?: undefined;
                    row?: undefined;
                    column?: undefined;
                };
            } | {
                property: string;
                value: {
                    type: string;
                    lineNames: never[][];
                    items: {
                        type: string;
                        value: {
                            type: string;
                            value: {
                                type: string;
                                value: number;
                            };
                        };
                    }[];
                    outside?: undefined;
                    inside?: undefined;
                    isListItem?: undefined;
                    row?: undefined;
                    column?: undefined;
                };
            } | {
                property: string;
                value: {
                    type: string;
                    lineNames: never[][];
                    items: {
                        type: string;
                        value: {
                            type: string;
                            value: {
                                type: string;
                            };
                        };
                    }[];
                    outside?: undefined;
                    inside?: undefined;
                    isListItem?: undefined;
                    row?: undefined;
                    column?: undefined;
                };
            } | {
                property: string;
                value: {
                    row: {
                        type: string;
                        value: {
                            type: string;
                            value: {
                                unit: string;
                                value: any;
                            };
                        };
                    };
                    column: {
                        type: string;
                        value: {
                            type: string;
                            value: {
                                unit: string;
                                value: any;
                            };
                        };
                    };
                    type?: undefined;
                    outside?: undefined;
                    inside?: undefined;
                    isListItem?: undefined;
                    lineNames?: undefined;
                    items?: undefined;
                };
            })[];
        };
        rules: {
            type: string;
            value: {
                selectors: ({
                    type: string;
                    value?: undefined;
                    kind?: undefined;
                    a?: undefined;
                    b?: undefined;
                    of?: undefined;
                } | {
                    type: string;
                    value: string;
                    kind?: undefined;
                    a?: undefined;
                    b?: undefined;
                    of?: undefined;
                } | {
                    type: string;
                    kind: string;
                    a: number;
                    b: number;
                    of: null;
                    value?: undefined;
                })[][];
                declarations: {
                    importantDeclarations: never[];
                    declarations: ({
                        property: string;
                        value: {
                            name: string;
                            value: {
                                type: string;
                                value: {
                                    type: string;
                                    value: number;
                                };
                            }[];
                            type?: undefined;
                            index?: undefined;
                        };
                    } | {
                        property: string;
                        value: {
                            type: string;
                            index: number;
                            name: null;
                            value?: undefined;
                        };
                    })[];
                };
                rules: never[];
                loc: {
                    source_index: number;
                    line: number;
                    column: number;
                };
            };
        }[];
        loc: {
            source_index: number;
            line: number;
            column: number;
        };
    };
};
