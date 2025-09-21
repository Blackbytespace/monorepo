export default class __BaseType {
    protected id: string;
    data: any;
    constructor(props?: any);
    validate(): any[];
    set(key: string, value: any): void;
    toObject(): any;
    has(key: string): boolean;
}
