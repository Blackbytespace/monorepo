import __LitElement from '@blackbyte/lit-element';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../../../src/components/widgets/textareaWidget/textareaWidget.bare.css';
import { TJsonSchemaFormSchema } from '../../../shared/JsonSchemaForm.type.js';

// @ts-ignore
@customElement('s-json-schema-form-textarea-widget')
export default class JsonSchemaFormTextareaWidget extends __LitElement {
  @property({ type: Function })
  public applyUpdate?: Function;

  @property({ type: String })
  public value: string = '';

  @property({ type: Object })
  public schema?: TJsonSchemaFormSchema;

  constructor() {
    super('s-json-schema-form-textarea-widget');
  }

  protected render(): any {
    return html` <div class=${this.cls('_textarea-widget')}>
      <textarea
        class="${this.cls('_textarea')} form-textarea"
        @change=${(e: InputEvent) => {
          const target = e.target as HTMLTextAreaElement;
          this.applyUpdate?.(target.value);
        }}
        rows="${this.schema?.editor?.rows ?? 5}"
        .value=${this.value ?? ''}
      >
      </textarea>
    </div>`;
  }
}
