import __LitElement from '@lotsof/lit-element';
import '../../../../src/components/widgets/textareaWidget/textareaWidget.bare.css';
import { TJsonSchemaFormSchema } from '../../../shared/JsonSchemaForm.type.js';
export default class JsonSchemaFormTextareaWidget extends __LitElement {
    applyUpdate?: Function;
    value: string;
    schema?: TJsonSchemaFormSchema;
    constructor();
    protected render(): any;
}
