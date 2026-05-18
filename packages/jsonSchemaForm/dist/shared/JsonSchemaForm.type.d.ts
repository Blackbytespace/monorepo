import { JSONSchema7 } from 'json-schema';
import { TJsonSchemaFormTextareaWidgetEditor } from '../components/widgets/textareaWidget/textareaWidget.type.js';
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
export type TJsonSchemaFormEditor = {
    group?: string;
    mock?: boolean;
    faker?: any;
} | TJsonSchemaFormTextareaWidgetEditor;
export type TJsonSchemaFormSchema = {
    editor?: TJsonSchemaFormEditor;
} & JSONSchema7;
export type TJsonSchemaFormWidget = {
    id: string;
    tag: string;
};
export type TJsonSchemaGroupRenderer = {
    id: string;
    tag: string;
};
