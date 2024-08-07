export default class __Base {
    protected id: string;
    protected data: any;
    constructor(props?: any);
    validate(): any[];
    set(key: string, value: any): void;
    toObject(): any;
    has(key: string): boolean;
}
