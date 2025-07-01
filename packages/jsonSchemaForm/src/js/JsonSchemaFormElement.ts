import __IconElement from '@blackbyte/icon-element';
import __JsonSchemaUtils from '@blackbyte/json-schema-utils';
import __LitElement from '@blackbyte/lit-element';
import { __copyText } from '@blackbyte/sugar/clipboard';
import { __disablePasswordManagerAttributes } from '@blackbyte/sugar/dom';
import { __isPlainObject } from '@blackbyte/sugar/is';
import {
  __deepFilter,
  __deepize,
  __deepMap,
  __deepMerge,
  __get,
  __set,
} from '@blackbyte/sugar/object';
import { faker } from '@faker-js/faker';
import { spread } from '@open-wc/lit-helpers';
import { JSONSchemaFaker } from 'json-schema-faker';
import { compileSchema, JsonError } from 'json-schema-library';
import { html, nothing, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { literal, html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import '../../src/css/JsonSchemaFormElement.css';
import '../components/groupRenderers/defaultGroupRenderer/defaultGroupRenderer.js';
import '../components/groupRenderers/stackGroupRenderer/stackGroupRenderer.js';
import '../components/widgets/textareaWidget/textareaWidget.js';
import {
  TJsonSchemaFormUpdateObject,
  TJsonSchemaFormWidget,
  TJsonSchemaGroupRenderer,
} from '../shared/JsonSchemaForm.type.js';

/**
 * Adding some custom faker methods
 * to be used in the editor
 * through the json schema "editor" property
 */
JSONSchemaFaker.extend('faker', () => {
  // @ts-ignore
  faker.image.picsum = (width, height) => {
    return `https://picsum.photos/${width}/${height}?v=${Math.round(
      Math.random() * 1000,
    )}`;
  };
  return faker;
});

export default class JsonSchemaFormElement extends __LitElement {
  public static widgets: Record<string, TJsonSchemaFormWidget> = {};
  public static registerWidget(widget: TJsonSchemaFormWidget): void {
    this.widgets[widget.id] = widget;
  }
  public static groupRenderers: Record<string, TJsonSchemaGroupRenderer> = {};
  public static registerGroupRenderer(
    groupRenderer: TJsonSchemaGroupRenderer,
  ): void {
    this.groupRenderers[groupRenderer.id] = groupRenderer;
  }

  @property({ type: Object })
  accessor schema: any = {};

  @property({ type: Object })
  accessor values: any = {};

  @property({ type: Boolean })
  accessor formClasses: boolean = false;

  @property()
  accessor buttonClasses: boolean | string = false;

  @property()
  accessor header: boolean | string = false;

  @property({ type: Object })
  accessor widgets: Record<string, TJsonSchemaFormWidget> = {};

  private _registeredWidgets: Record<string, TJsonSchemaFormWidget> = {};
  private _errorsByPath: Record<string, JsonError[]> = {};
  private _jsonSchemaUtils: __JsonSchemaUtils = new __JsonSchemaUtils();
  private _finalSchema: any = {};

  constructor() {
    super('s-json-schema-form');
  }

  public get $form(): HTMLFormElement | null {
    const $field = this.querySelector('input, select, textarea') as any;
    return $field?.form ?? null;
  }

  async mount() {
    // handle the widgets
    this._registeredWidgets = {
      wysiwyg: {
        id: 'wysiwyg',
        tag: 's-json-schema-form-wysiwyg-widget',
      },
      ...this.widgets,
      ...JsonSchemaFormElement.widgets,
    };
  }

  protected update(changedProperties: PropertyValues): void {
    // fill the "_finalSchema" property
    // with the schema that has been extended
    // using the "extends" property
    if (changedProperties.has('schema')) {
      this._finalSchema = this._jsonSchemaUtils.applyExtends(this.schema);
    }

    // handle the "-invalid" class on the form
    if (this.$form) {
      if (this.$form.checkValidity()) {
        this.$form.classList.remove('-invalid');
      } else {
        this.$form.classList.add('-invalid');
      }
    }

    // apply the update in parent class
    super.update(changedProperties);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    // handle form submit.
    // this will prevent the form to be submitted if
    // any field is invalid
    this._handleFormSubmit();
  }

  private _handleFormSubmit(): void {
    const $form = this.$form;
    if (!$form) return;
    // override the "checkValidity" method to check
    // if there's any errors in the form
    const originalCheck = $form.checkValidity;
    $form.checkValidity = () => {
      if (!originalCheck.call($form)) {
        return false;
      }
      if (Object.keys(this._errorsByPath).length) {
        return false;
      }
      return true;
    };
  }

  private _findInSchema(schema: any, path: string[]): any {
    const foundSchema = path.reduce((acc, key) => {
      if (acc?.properties?.[key]) {
        return acc.properties[key];
      }
      if (acc?.items?.properties?.[key]) {
        return acc.items.properties[key];
      }
      if (acc?.[key] !== undefined) {
        return acc[key];
      }
      return null;
    }, schema);

    return foundSchema;
  }

  private _validateValues(schema: any, value: any): JsonError[] {
    const jsonSchema = compileSchema(schema),
      validateResponse = jsonSchema.validate(value);

    return validateResponse.errors.filter((error) => {
      // @ts-ignore
      if (!error.data.received && !error.schema?.required) {
        return false;
      }
      // @ts-ignore
      if (error.data?.received === 'undefined' && !error.schema?.required) {
        return false; // Ignore undefined values for non-required fields
      }
      return true; // Keep other errors
    });
  }

  private _renderComponentValueErrors(path: string[]): any {
    const errors = this._errorsByPath[path.join('.')] ?? [];

    if (!errors.length) return '';

    return html`
      <ul class=${`${this.cls('_values-errors')} errors`}>
        ${errors.map(
          (error) => html`
            <li class=${`${this.cls('_values-error error')} error`}>
              ${error.message
                .replace('in `#`', '')
                .replace('at `#`', '')
                .trim()}
            </li>
          `,
        )}
      </ul>
    `;
  }

  private _renderComponentValueEditWidget(value: any, path: string[]): any {
    // remove the numerical indexes in the path.
    // this is due to the fact that the schema is not
    // aware of the array indexes
    const pathWithoutIndexes = path.filter((p) => isNaN(parseInt(p)));

    // get the schema for the current path
    const schema = this._findInSchema(this._finalSchema, pathWithoutIndexes);

    // get the field name
    const fieldName = path[path.length - 1];

    // handle default value
    if (
      (value === null || value === undefined) &&
      schema.default !== undefined
    ) {
      __set(this.values, path, schema.default);
      value = schema.default;
    }

    const disablePasswordManagerAttributes =
      __disablePasswordManagerAttributes();

    // validate the value
    let renderedErrors = '';
    const errors = this._validateValues(schema, value);
    if (errors.length) {
      this._errorsByPath[path.join('.')] = errors;
      this.requestUpdate();
    } else {
      delete this._errorsByPath[path.join('.')];
    }

    if (schema) {
      switch (true) {
        case schema.enum !== undefined:
          return html`<select
              ${spread(disablePasswordManagerAttributes)}
              id="${this.getIdFromPath(path)}"
              name=${fieldName}
              class=${`${this.cls('_values-select')} ${
                this.formClasses ? 'form-select' : ''
              }`}
              autofocus=${schema.autofocus ?? nothing}
              @change=${(e) => {
                __set(this.values, path, e.target.value);
                this._emitUpdate({
                  value: e.target.value,
                  path,
                });
              }}
            >
              ${schema.enum.map((v) => {
                return html`<option value=${v} ?selected=${v === value}>
                  ${v}
                </option>`;
              })}
            </select>
            ${renderedErrors} `;
          break;
        case schema.type === 'string':
          return html`<input
            ${spread(disablePasswordManagerAttributes)}
            type="text"
            name=${fieldName}
            .value=${value ?? ''}
            id="${this.getIdFromPath(path)}"
            class=${`${this.cls('_values-input')} ${
              this.formClasses ? 'form-input' : ''
            }`}
            autofocus=${schema.autofocus ?? nothing}
            placeholder=${schema.placeholder ?? ''}
            @input=${(e: any) => {
              __set(this.values, path, e.target.value);
            }}
            @change=${(e) => {
              this._emitUpdate({
                value: e.target.value,
                path,
              });
            }}
          />`;
          break;
        case schema.type === 'boolean':
          return html`<input
            type="checkbox"
            name=${fieldName}
            .checked=${value}
            id="${this.getIdFromPath(path)}"
            class=${`${this.cls('_values-checkbox')} ${
              this.formClasses ? 'form-checkbox' : ''
            }`}
            autofocus=${schema.autofocus ?? nothing}
            @change=${(e) => {
              __set(this.values, path, e.target.checked);
              this._emitUpdate({
                value: e.target.checked,
                path,
              });
            }}
          />`;
          break;
        case schema.type === 'integer':
        case schema.type === 'number':
          return html`<input
            ${spread(disablePasswordManagerAttributes)}
            type="number"
            name=${fieldName}
            .value=${value}
            min=${schema.minimum}
            max=${schema.maximum}
            id="${this.getIdFromPath(path)}"
            class=${`${this.cls('_values-input')} ${
              this.formClasses ? 'form-input form-number' : ''
            }`}
            autofocus=${schema.autofocus ?? nothing}
            @input=${(e: any) => {
              __set(this.values, path, parseFloat(e.target.value));
            }}
            @change=${(e) => {
              this._emitUpdate({
                value: e.target.value,
                path,
              });
            }}
          />`;
          break;
      }
    }

    return typeof value === 'number'
      ? html`<span class="-number">${value}</span>`
      : value === true
      ? html`<span class="-true">true</span>`
      : value === false
      ? html`<span class="-false">false</span>`
      : value === null
      ? html`<span class="-null">null</span>`
      : value === undefined
      ? html`<span class="-undefined">undefined</span>`
      : value;
  }

  private async _emitUpdate(
    update: TJsonSchemaFormUpdateObject,
  ): Promise<void> {
    // dispatch the update
    this.dispatch('update', {
      detail: {
        values: this.values,
        update,
      },
    });

    // update the component
    this.requestUpdate();
  }

  private _createComponentDefaultValuesFromSchema(schema: any): any {
    const newValues: any = {};

    __deepMap(schema, ({ object, prop, value, path }) => {
      if (object.type !== 'object' && prop === 'type') {
        const finalPath = path
          .split('.')
          .filter((p) => p !== 'properties' && p !== 'items' && p !== 'type');
        let newValue: any = object.default;

        if (newValue === undefined) {
          switch (true) {
            case object.enum !== undefined:
              newValue = object.enum[0];
              break;
              break;
            case value === 'string':
              newValue = '';
              break;
            case value === 'boolean':
              newValue = false;
              break;
            case value === 'number':
              if (object.minimum !== undefined) {
                newValue = object.minimum;
              } else {
                newValue = 0;
              }
              break;
          }
        }
        newValues[finalPath.join('.')] = newValue;
      }
      return value;
    });
    return __deepize(newValues);
  }

  public getIdFromPath(path: string[]): string {
    return `${this.tagName.toLowerCase()}-value-${path.join('-')}`;
  }

  private _renderComponentValuesPreview(schema: any, path: string[] = []): any {
    // get the values for the current path
    let values = __get(this.values, path);

    // check if we have a widget specified and that it is available
    if (schema.editor?.widget) {
      if (!this._registeredWidgets[schema.editor?.widget]) {
        throw new Error(
          `The widget "${schema.editor?.widget}" is not registered in JsonSchemaForm. Make sure to register it using JsonSchemaForm.registerWidget static method...`,
        );
      }
      const tag = literal`${unsafeStatic(
        this._registeredWidgets[schema.editor?.widget].tag,
      )}`;
      return staticHtml`
        <${tag} class="${this.cls(
        '_widget _values-value',
      )}" .value=${values} .schema=${schema} .applyUpdate=${(newValue) => {
        __set(this.values, path, newValue);
        this._emitUpdate({
          value: newValue,
          path,
        });
      }}></${tag}>
      `;
    }

    // handle group display
    if (schema.editor?.groups?.length) {
      return html`
        <ul class=${this.cls('_groups')}>
          ${schema.editor.groups.map((group) => {
            // make sure the group has a type
            if (!group.type) {
              group.type = 'default';
            }

            // generate new schema that contains only the properties
            // of the current group
            const groupProperties = {};
            for (let [properyName, propertyValue] of Object.entries(
              schema.properties,
            )) {
              // @ts-ignore
              if (propertyValue.editor?.group === group.id) {
                groupProperties[properyName] = propertyValue;
              } else if (!(<any>propertyValue).editor?.group) {
                if (!(<any>propertyValue).editor) {
                  (<any>propertyValue).editor = {};
                }
                (<any>propertyValue).editor.group = 'default';
                groupProperties[properyName];
              }
            }

            // create the new group based schema
            const groupSchema = {
              ...schema,
              title: group.title,
              description: group.description,
              properties: groupProperties,
              isGroup: group.id !== 'default',
            };

            // remove the "editor" property from the schema
            // this is to avoid infinite loop
            // when rendering the groups
            delete groupSchema.editor;

            const tag = literal`${unsafeStatic(
              JsonSchemaFormElement.groupRenderers[group.type]?.tag,
            )}`;

            const renderedProps = this._renderComponentValuesPreview(
              groupSchema,
              path,
            );

            // render the group as a normal
            // schema
            return html`
              <li class=${this.cls(`_group -${group.type ?? 'default'}`)}>
                <div class="${this.cls('_group-body')}">
                  ${staticHtml`
                    <${tag} .renderedProps=${renderedProps} ${spread(
                    group,
                  )}>        
                    ${renderedProps}
                    </${tag}>
                `}
                </div>
              </li>
            `;
          })}
        </ul>
      `;
    }

    // if the schema is an array and the values are not defined,
    // we create an empty array to avoid errors
    // when rendering the array items
    if (schema.type === 'array' && !Array.isArray(values)) {
      values = [];
    }

    switch (true) {
      case schema.type === 'object' && schema.properties !== undefined:
        return html`
          <div class="${this.cls('_values-object')}">
            <div class=${this.cls('_values-object-inner')}>
              ${schema.isGroup
                ? html`
                    <header class=${this.cls('_group-header')}>
                      <h3 class=${this.cls('_group-title')}>${schema.title}</h3>
                      <p class=${this.cls('_group-description')}>
                        ${schema.description}
                      </p>
                    </header>
                  `
                : ''}
              <ul class=${this.cls('_values-object-items')}>
                ${Object.entries(schema.properties).map(([key, value]) => {
                  if ((<any>value).type === 'object') {
                    const objectId = __get(this.values, [...path, key, 'id']);

                    return html`
                      <li class=${this.cls('_values-object-item')}>
                        <header
                          class="${this.cls('_values-object-item-header')}"
                        >
                          <h3 class="${this.cls('_values-object-item-title')}">
                            ${(<any>value).title ?? key}
                          </h3>
                          ${objectId
                            ? html`
                                <button
                                  class="${this.cls(
                                    '_values-array-item-id',
                                  )} button -sm -outline"
                                  @click=${() => {
                                    __copyText(objectId);
                                  }}
                                >
                                  ID: #${objectId}
                                </button>
                              `
                            : ''}
                        </header>
                        ${this._renderComponentValuesPreview(
                          schema.properties[key],
                          [...path, key],
                        )}
                        ${this._renderComponentValueErrors([...path, key])}
                      </li>
                    `;
                  } else {
                    return html`
                      <li class=${this.cls('_values-item _values-item-object')}>
                        <label
                          for="${this.getIdFromPath([...path, key])}"
                          class="${this.cls('_values-label')} ${this.formClasses
                            ? 'form-label'
                            : ''}"
                        >
                          <div
                            class=${this.cls('_values-prop')}
                            style="--prop-length: ${key.length}"
                          >
                            <span class=${this.cls('_values-prop-name')}
                              >${(<any>value).title ?? key}</span
                            >
                          </div>
                        </label>
                        ${this._renderComponentValuesPreview(
                          schema.properties[key],
                          [...path, key],
                        )}

                        <nav class=${this.cls('_values-prop-tools')}>
                          ${(<any>value).editor?.mock
                            ? html`
                                <button
                                  class=${this.cls('_values-prop-tool')}
                                  @click=${(e: MouseEvent) => {
                                    // generate a mock value
                                    const mock = JSONSchemaFaker.generate(
                                      value ?? {},
                                    );

                                    // set the value in the values object
                                    // and emit the update
                                    __set(this.values, [...path, key], mock);
                                    this._emitUpdate({
                                      value: mock,
                                      path: [...path, key],
                                    });
                                  }}
                                >
                                  <s-icon name="arrow-path"></s-icon>
                                </button>
                              `
                            : ''}
                        </nav>
                        ${this._renderComponentValueErrors([...path, key])}
                      </li>
                    `;
                  }
                })}
              </ul>
            </div>
          </div>
        `;
      case schema.type === 'array' && schema.items !== undefined:
        return html`
          <div class=${this.cls('_values-array')}>
            ${schema.isGroup
              ? html`
                  <header class=${this.cls('_group-header')}>
                    <h3 class=${this.cls('_group-title')}>${schema.title}</h3>
                    <p class=${this.cls('_group-description')}>
                      ${schema.description}
                    </p>
                  </header>
                `
              : ''}
            <ul class=${this.cls('_values-array-items')}>
              ${values?.length
                ? html`
                    ${values.map(
                      (value, i) => html`
                        <li class=${this.cls('_values-array-item')}>
                          <div class=${this.cls('_values-array-item-header')}>
                            <p class="${this.cls('_values-array-item-index')}">
                              ${schema.title.replace(/s$/, '')} #${i}
                            </p>
                            ${value.id
                              ? html`
                                  <button
                                    class="${this.cls(
                                      '_values-array-item-id',
                                    )} button -outline"
                                    @click=${() => {
                                      __copyText(value.id);
                                    }}
                                  >
                                    ID: #${value.id}
                                  </button>
                                `
                              : ''}
                            <button
                              class="${this.cls(
                                '_values-array-item-remove',
                              )} button -outline"
                              @click=${() => {
                                values.splice(i, 1);
                                this._emitUpdate({
                                  value: values,
                                  path,
                                });
                              }}
                            >
                              Remove
                            </button>
                          </div>
                          ${this._renderComponentValuesPreview(schema.items, [
                            ...path,
                            `${i}`,
                          ])}
                          ${this._renderComponentValueErrors([...path, `${i}`])}
                        </li>
                      `,
                    )}
                  `
                : ''}
              <button
                class=${`${this.cls('_values-add')} ${
                  this.buttonClasses === true
                    ? 'button'
                    : typeof this.buttonClasses === 'string'
                    ? this.buttonClasses
                    : ''
                }`}
                @click=${() => {
                  const newValues =
                    this._createComponentDefaultValuesFromSchema(schema.items);
                  values.push(newValues);

                  this._emitUpdate({
                    value: values,
                    path,
                  });

                  this.requestUpdate();
                }}
              >
                Add a ${schema.items.title?.toLowerCase() ?? 'new item'}
              </button>
            </ul>
          </div>
        `;
      default:
        return html`
          <div class=${this.cls('_values-value')}>
            ${this._renderComponentValueEditWidget(values, path)}
          </div>
        `;
    }
  }

  protected render() {
    if (this._finalSchema) {
      return html`
        <div class=${this.cls('_inner')}>
          ${this.header
            ? html`
                <header class=${this.cls('_header')}>
                  <div class=${this.cls('_header-metas')}>
                    <h2 class=${this.cls('_header-title')}>
                      ${this._finalSchema.title}
                    </h2>
                    ${this.values?.id
                      ? html`<span
                          class="${this.cls(
                            '_header-title-id',
                          )} button -outline"
                          @click=${() => {
                            __copyText(this.values.id);
                          }}
                          >ID: #${this.values.id}
                          <s-icon name="clipboard-document-list"
                        /></span>`
                      : ''}
                  </div>
                  <div class=${this.cls('_header-content')}>
                    <p class=${this.cls('_header-description')}>
                      ${this._finalSchema.description}
                    </p>
                    <nav class=${this.cls('_header-tools')}>
                      <button
                        class=${this.cls('_header-tool')}
                        @click=${(e: MouseEvent) => {
                          const finalSchema = __deepFilter(
                            this.schema,
                            ({ key, value, isObject }) => {
                              if (
                                !isObject ||
                                key === 'properties' ||
                                key === 'faker'
                              ) {
                                return true;
                              }
                              if (
                                isObject &&
                                !value.$id &&
                                !value.editor?.mock
                              ) {
                                return false;
                              }
                              return true;
                            },
                          );

                          // generate a mock value
                          const mock = JSONSchemaFaker.generate(
                            finalSchema.properties ?? {},
                          );

                          for (let [key, value] of Object.entries(mock)) {
                            if (
                              __isPlainObject(this.values[key]) &&
                              __isPlainObject(value)
                            ) {
                              console.log('key', key, this.values[key]);
                              __deepMerge([this.values[key], value], {
                                clone: false,
                              });
                            } else {
                              this.values[key] = value;
                            }

                            this._emitUpdate({
                              value: value,
                              path: [key],
                            });
                          }
                        }}
                      >
                        <s-icon name="arrow-path"></s-icon>
                      </button>
                    </nav>
                  </div>
                </header>
              `
            : ''}
          <div class=${this.cls('_values')}>
            ${this._renderComponentValuesPreview(this._finalSchema)}
          </div>
        </div>
      `;
    }
  }
}

JsonSchemaFormElement.registerGroupRenderer({
  id: 'default',
  tag: 's-json-schema-form-default-group-renderer',
});
JsonSchemaFormElement.registerGroupRenderer({
  id: 'stack',
  tag: 's-json-schema-form-stack-group-renderer',
});

JsonSchemaFormElement.registerWidget({
  id: 'textarea',
  tag: 's-json-schema-form-textarea-widget',
});

JsonSchemaFormElement.define('s-json-schema-form', JsonSchemaFormElement, {});
__IconElement.define('s-icon', {
  type: 'outline',
});
