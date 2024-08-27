export type TParseArgsResult = {
    ast: any;
    values: any;
};
export type TParseArgsSettings = {
    separator: string | string[];
    resolve: boolean;
};
export default function parseArgs(args: any[], schema?: string[], settings?: Partial<TParseArgsSettings>): TParseArgsResult;
