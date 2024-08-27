export default function (): ({
    type: string;
    value: {
        selectors: {
            type: string;
        }[][];
        declarations: {
            importantDeclarations: never[];
            declarations: {
                property: string;
                value: {
                    name: string;
                    value: {
                        type: string;
                        value: {
                            type: string;
                            value: string;
                        };
                    }[];
                };
            }[];
        };
        rules: never[];
        loc: {
            source_index: number;
            line: number;
            column: number;
        };
    };
} | {
    type: string;
    value: {
        selectors: ({
            type: string;
            kind?: undefined;
            value?: undefined;
        } | {
            type: string;
            kind: string;
            value: string;
        })[][];
        declarations: {
            importantDeclarations: never[];
            declarations: {
                property: string;
                value: {
                    type: string;
                    value: string;
                };
            }[];
        };
        rules: never[];
        loc: {
            source_index: number;
            line: number;
            column: number;
        };
    };
})[];
