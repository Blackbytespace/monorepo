import { JSONSchema7 } from 'json-schema';
export type TJsonSchemaFormSettings = {
    classPrefix: string;
    mock?: boolean;
};
export type TJsonSchemaFormUpdateEvent = {
    values: any;
    update: TJsonSchemaFormUpdateObject;
};
export type TJsonSchemaFormUpdateObject = {
    path: string[];
    value: any;
};
export type TJsonSchemaFormSchema = {} & JSONSchema7;
export type TJsonSchemaFormWidget = {
    id: string;
    tag: string;
};
export type TJsonSchemaGroupRenderer = {
    id: string;
    tag: string;
};
