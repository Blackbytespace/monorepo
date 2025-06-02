var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _JsonSchemaFormElement_schema_accessor_storage, _JsonSchemaFormElement_values_accessor_storage, _JsonSchemaFormElement_formClasses_accessor_storage, _JsonSchemaFormElement_buttonClasses_accessor_storage, _JsonSchemaFormElement_header_accessor_storage, _JsonSchemaFormElement_widgets_accessor_storage;
import __IconElement from '@lotsof/icon-element';
import __LitElement from '@lotsof/lit-element';
import { __copyText } from '@lotsof/sugar/clipboard';
import { __deepize, __deepMap, __get, __set } from '@lotsof/sugar/object';
import { spread } from '@open-wc/lit-helpers';
import { Draft2019 } from 'json-schema-library';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { literal, html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import '../../src/css/JsonSchemaFormElement.css';
import '../components/defaultGroupRenderer/defaultGroupRenderer.js';
import '../components/stackGroupRenderer/stackGroupRenderer.js';
class JsonSchemaFormElement extends __LitElement {
    static registerWidget(widget) {
        this.widgets[widget.id] = widget;
    }
    static registerGroupRenderer(groupRenderer) {
        this.groupRenderers[groupRenderer.id] = groupRenderer;
    }
    get schema() { return __classPrivateFieldGet(this, _JsonSchemaFormElement_schema_accessor_storage, "f"); }
    set schema(value) { __classPrivateFieldSet(this, _JsonSchemaFormElement_schema_accessor_storage, value, "f"); }
    get values() { return __classPrivateFieldGet(this, _JsonSchemaFormElement_values_accessor_storage, "f"); }
    set values(value) { __classPrivateFieldSet(this, _JsonSchemaFormElement_values_accessor_storage, value, "f"); }
    get formClasses() { return __classPrivateFieldGet(this, _JsonSchemaFormElement_formClasses_accessor_storage, "f"); }
    set formClasses(value) { __classPrivateFieldSet(this, _JsonSchemaFormElement_formClasses_accessor_storage, value, "f"); }
    get buttonClasses() { return __classPrivateFieldGet(this, _JsonSchemaFormElement_buttonClasses_accessor_storage, "f"); }
    set buttonClasses(value) { __classPrivateFieldSet(this, _JsonSchemaFormElement_buttonClasses_accessor_storage, value, "f"); }
    get header() { return __classPrivateFieldGet(this, _JsonSchemaFormElement_header_accessor_storage, "f"); }
    set header(value) { __classPrivateFieldSet(this, _JsonSchemaFormElement_header_accessor_storage, value, "f"); }
    get widgets() { return __classPrivateFieldGet(this, _JsonSchemaFormElement_widgets_accessor_storage, "f"); }
    set widgets(value) { __classPrivateFieldSet(this, _JsonSchemaFormElement_widgets_accessor_storage, value, "f"); }
    constructor() {
        super('s-json-schema-form');
        _JsonSchemaFormElement_schema_accessor_storage.set(this, {});
        _JsonSchemaFormElement_values_accessor_storage.set(this, {});
        _JsonSchemaFormElement_formClasses_accessor_storage.set(this, false);
        _JsonSchemaFormElement_buttonClasses_accessor_storage.set(this, false);
        _JsonSchemaFormElement_header_accessor_storage.set(this, true);
        _JsonSchemaFormElement_widgets_accessor_storage.set(this, {});
        this._registeredWidgets = {};
        this._errorsByPath = {};
    }
    get $form() {
        var _a;
        const $field = this.querySelector('input, select, textarea');
        return (_a = $field === null || $field === void 0 ? void 0 : $field.form) !== null && _a !== void 0 ? _a : null;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // handle the widgets
            this._registeredWidgets = Object.assign(Object.assign({ wysiwyg: {
                    id: 'wysiwyg',
                    tag: 's-json-schema-form-wysiwyg-widget',
                } }, this.widgets), JsonSchemaFormElement.widgets);
        });
    }
    update(changedProperties) {
        super.update(changedProperties);
        // handle the "-invalid" class on the form
        if (this.$form) {
            if (this.$form.checkValidity()) {
                this.$form.classList.remove('-invalid');
            }
            else {
                this.$form.classList.add('-invalid');
            }
        }
    }
    firstUpdated(_changedProperties) {
        // handle form submit.
        // this will prevent the form to be submitted if
        // any field is invalid
        this._handleFormSubmit();
    }
    _handleFormSubmit() {
        const $form = this.$form;
        if (!$form)
            return;
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
    _findInSchema(schema, path) {
        const foundSchema = path.reduce((acc, key) => {
            var _a, _b, _c;
            if ((_a = acc === null || acc === void 0 ? void 0 : acc.properties) === null || _a === void 0 ? void 0 : _a[key]) {
                return acc.properties[key];
            }
            if ((_c = (_b = acc === null || acc === void 0 ? void 0 : acc.items) === null || _b === void 0 ? void 0 : _b.properties) === null || _c === void 0 ? void 0 : _c[key]) {
                return acc.items.properties[key];
            }
            if ((acc === null || acc === void 0 ? void 0 : acc[key]) !== undefined) {
                return acc[key];
            }
            return null;
        }, schema);
        return foundSchema;
    }
    _validateValues(schema, value) {
        const jsonSchema = new Draft2019(schema), errors = jsonSchema.validate(value);
        return errors;
    }
    _renderComponentValueErrors(path) {
        var _a;
        const errors = (_a = this._errorsByPath[path.join('.')]) !== null && _a !== void 0 ? _a : [];
        if (!errors.length)
            return '';
        return html `
      <ul class=${`${this.cls('_values-errors')} errors`}>
        ${errors.map((error) => html `
            <li class=${`${this.cls('_values-error error')} error`}>
              ${error.message
            .replace('in `#`', '')
            .replace('at `#`', '')
            .trim()}
            </li>
          `)}
      </ul>
    `;
    }
    _renderComponentValueEditWidget(value, path) {
        var _a, _b, _c, _d, _e;
        // remove the numerical indexes in the path.
        // this is due to the fact that the schema is not
        // aware of the array indexes
        const pathWithoutIndexes = path.filter((p) => isNaN(parseInt(p)));
        // get the schema for the current path
        const schema = this._findInSchema(this.schema, pathWithoutIndexes);
        // get the field name
        const fieldName = path[path.length - 1];
        // handle default value
        if (value === null && schema.default !== undefined) {
            __set(this.values, path, schema.default);
            value = schema.default;
        }
        // validate the value
        let renderedErrors = '';
        const errors = this._validateValues(schema, value);
        if (errors.length) {
            this._errorsByPath[path.join('.')] = errors;
            this.requestUpdate();
        }
        else {
            delete this._errorsByPath[path.join('.')];
        }
        if (schema) {
            switch (true) {
                case schema.enum !== undefined:
                    return html `<select
              id="${this.getIdFromPath(path)}"
              name=${fieldName}
              class=${`${this.cls('_values-select')} ${this.formClasses ? 'form-select' : ''}`}
              autofocus=${(_a = schema.autofocus) !== null && _a !== void 0 ? _a : nothing}
              @change=${(e) => {
                        __set(this.values, path, e.target.value);
                        this._emitUpdate({
                            value: e.target.value,
                            path,
                        });
                    }}
            >
              ${schema.enum.map((v) => {
                        return html `<option value=${v} ?selected=${v === value}>
                  ${v}
                </option>`;
                    })}
            </select>
            ${renderedErrors} `;
                    break;
                case schema.type === 'string':
                    return html `<input
            type="text"
            name=${fieldName}
            .value=${value !== null && value !== void 0 ? value : ''}
            id="${this.getIdFromPath(path)}"
            class=${`${this.cls('_values-input')} ${this.formClasses ? 'form-input' : ''}`}
            autofocus=${(_b = schema.autofocus) !== null && _b !== void 0 ? _b : nothing}
            placeholder=${(_c = schema.placeholder) !== null && _c !== void 0 ? _c : ''}
            @input=${(e) => {
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
                    return html `<input
            type="checkbox"
            name=${fieldName}
            .checked=${value}
            id="${this.getIdFromPath(path)}"
            class=${`${this.cls('_values-checkbox')} ${this.formClasses ? 'form-checkbox' : ''}`}
            autofocus=${(_d = schema.autofocus) !== null && _d !== void 0 ? _d : nothing}
            @change=${(e) => {
                        __set(this.values, path, e.target.checked);
                        this._emitUpdate({
                            value: e.target.checked,
                            path,
                        });
                    }}
          />`;
                    break;
                case schema.type === 'number':
                    return html `<input
            type="number"
            name=${fieldName}
            .value=${value}
            min=${schema.minimum}
            max=${schema.maximum}
            id="${this.getIdFromPath(path)}"
            class=${`${this.cls('_values-input')} ${this.formClasses ? 'form-input form-number' : ''}`}
            autofocus=${(_e = schema.autofocus) !== null && _e !== void 0 ? _e : nothing}
            @input=${(e) => {
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
            ? html `<span class="-number">${value}</span>`
            : value === true
                ? html `<span class="-true">true</span>`
                : value === false
                    ? html `<span class="-false">false</span>`
                    : value === null
                        ? html `<span class="-null">null</span>`
                        : value === undefined
                            ? html `<span class="-undefined">undefined</span>`
                            : value;
    }
    _emitUpdate(update) {
        return __awaiter(this, void 0, void 0, function* () {
            // dispatch the update
            this.dispatch('update', {
                detail: {
                    values: this.values,
                    update,
                },
            });
            // update the component
            this.requestUpdate();
        });
    }
    _createComponentDefaultValuesFromSchema(schema) {
        const newValues = {};
        __deepMap(schema, ({ object, prop, value, path }) => {
            if (object.type !== 'object' && prop === 'type') {
                const finalPath = path
                    .split('.')
                    .filter((p) => p !== 'properties' && p !== 'items' && p !== 'type');
                let newValue = object.default;
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
                            }
                            else {
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
    getIdFromPath(path) {
        return `${this.tagName.toLowerCase()}-value-${path.join('-')}`;
    }
    _renderComponentValuesPreview(schema, path = []) {
        var _a, _b, _c, _d;
        // get the values for the current path
        const values = __get(this.values, path);
        // check if we have a widget specified and that it is available
        if (schema.widget) {
            if (!this._registeredWidgets[schema.widget]) {
                throw new Error(`The widget "${schema.widget}" is not registered in carpenter. Make sure to register it using SCarpenterElement.registerWidget static method...`);
            }
            const tag = literal `${unsafeStatic(this._registeredWidgets[schema.widget].tag)}`;
            return staticHtml `
        <${tag} @s-carpenter.update=${(e) => {
                __set(this.values, path, e.detail);
                this._emitUpdate({
                    value: e.detail,
                    path,
                });
            }}></${tag}>
      `;
        }
        // handle group display
        if ((_b = (_a = schema.editor) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.length) {
            return html `
        <ul class=${this.cls('_groups')}>
          ${schema.editor.groups.map((group) => {
                var _a, _b, _c, _d;
                // make sure the group has a type
                if (!group.type) {
                    group.type = 'default';
                }
                // generate new schema that contains only the properties
                // of the current group
                const groupProperties = {};
                for (let [properyName, propertyValue] of Object.entries(schema.properties)) {
                    // @ts-ignore
                    if (((_a = propertyValue.editor) === null || _a === void 0 ? void 0 : _a.group) === group.id) {
                        groupProperties[properyName] = propertyValue;
                    }
                    else if (!((_b = propertyValue.editor) === null || _b === void 0 ? void 0 : _b.group)) {
                        if (!propertyValue.editor) {
                            propertyValue.editor = {};
                        }
                        propertyValue.editor.group = 'default';
                        groupProperties[properyName];
                    }
                }
                // create the new group based schema
                const groupSchema = Object.assign(Object.assign({}, schema), { title: group.title, description: group.description, properties: groupProperties, isGroup: group.id !== 'default' });
                // remove the "editor" property from the schema
                // this is to avoid infinite loop
                // when rendering the groups
                delete groupSchema.editor;
                const tag = literal `${unsafeStatic((_c = JsonSchemaFormElement.groupRenderers[group.type]) === null || _c === void 0 ? void 0 : _c.tag)}`;
                const renderedProps = this._renderComponentValuesPreview(groupSchema, path);
                // render the group as a normal
                // schema
                return html `
              <li class=${this.cls(`_group -${(_d = group.type) !== null && _d !== void 0 ? _d : 'default'}`)}>
                <div class="${this.cls('_group-body')}">
                  ${staticHtml `
                    <${tag} .renderedProps=${renderedProps} ${spread(group)}>        
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
        // console.log('eee', schema, path, values);
        switch (true) {
            case schema.type === 'object' && schema.properties !== undefined:
                return html `
          <div class="${this.cls('_values-object')}">
            <div class=${this.cls('_values-object-inner')}>
              ${schema.isGroup
                    ? html `
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
                    var _a, _b;
                    if (value.type === 'object') {
                        return html `
                      <li class=${this.cls('_values-object-item')}>
                        <header
                          class="${this.cls('_values-object-item-header')}"
                        >
                          <h3 class="${this.cls('_values-object-item-title')}">
                            ${(_a = value.title) !== null && _a !== void 0 ? _a : key}
                          </h3>
                        </header>
                        ${this._renderComponentValuesPreview(schema.properties[key], [...path, key])}
                        ${this._renderComponentValueErrors([...path, key])}
                      </li>
                    `;
                    }
                    else {
                        return html `
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
                            ${(_b = value.title) !== null && _b !== void 0 ? _b : key}
                          </div>
                        </label>
                        ${this._renderComponentValuesPreview(schema.properties[key], [...path, key])}
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
                return html `
          <div class=${this.cls('_values-array')}>
            ${schema.isGroup
                    ? html `
                  <header class=${this.cls('_group-header')}>
                    <h3 class=${this.cls('_group-title')}>${schema.title}</h3>
                    <p class=${this.cls('_group-description')}>
                      ${schema.description}
                    </p>
                  </header>
                `
                    : ''}
            <ul class=${this.cls('_values-array-items')}>
              ${(values === null || values === void 0 ? void 0 : values.length)
                    ? html `
                    ${values.map((value, i) => html `
                        <li class=${this.cls('_values-array-item')}>
                          <div class=${this.cls('_values-array-item-header')}>
                            <p class="${this.cls('_values-array-item-index')}">
                              ${schema.title.replace(/s$/, '')} #${i}
                            </p>
                            ${value.id
                        ? html `
                                  <button
                                    class="${this.cls('_values-array-item-id')} button -outline"
                                    @click=${() => {
                            __copyText(value.id);
                        }}
                                  >
                                    ID: #${value.id}
                                  </button>
                                `
                        : ''}
                            <button
                              class="${this.cls('_values-array-item-remove')} button -outline"
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
                      `)}
                  `
                    : ''}
              <button
                class=${`${this.cls('_values-add')} ${this.buttonClasses === true
                    ? 'button'
                    : typeof this.buttonClasses === 'string'
                        ? this.buttonClasses
                        : ''}`}
                @click=${() => {
                    const newValues = this._createComponentDefaultValuesFromSchema(schema.items);
                    if (!values) {
                        __set(this.values, path, [newValues]);
                    }
                    else {
                        values.push(newValues);
                    }
                    this._emitUpdate({
                        value: values,
                        path,
                    });
                    this.requestUpdate();
                }}
              >
                Add a ${(_d = (_c = schema.items.title) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : 'new item'}
              </button>
            </ul>
          </div>
        `;
            default:
                return html `
          <div class=${this.cls('_values-value')}>
            ${this._renderComponentValueEditWidget(values, path)}
          </div>
        `;
        }
    }
    render() {
        var _a;
        if (this.schema) {
            return html `
        <div class=${this.cls('_inner')}>
          ${this.header
                ? html `
                <header class=${this.cls('_header')}>
                  <h2 class=${this.cls('_title')}>
                    ${this.schema.title}
                    ${((_a = this.values) === null || _a === void 0 ? void 0 : _a.id)
                    ? html `<span
                          class="${this.cls('_title-id')} button -outline"
                          @click=${() => {
                        __copyText(this.values.id);
                    }}
                          >ID: #${this.values.id}
                          <s-icon name="clipboard-document-list"
                        /></span>`
                    : ''}
                  </h2>
                  <p class=${this.cls('_description')}>
                    ${this.schema.description}
                  </p>
                </header>
              `
                : ''}
          <div class=${this.cls('_values')}>
            ${this._renderComponentValuesPreview(this.schema)}
          </div>
        </div>
      `;
        }
    }
}
_JsonSchemaFormElement_schema_accessor_storage = new WeakMap(), _JsonSchemaFormElement_values_accessor_storage = new WeakMap(), _JsonSchemaFormElement_formClasses_accessor_storage = new WeakMap(), _JsonSchemaFormElement_buttonClasses_accessor_storage = new WeakMap(), _JsonSchemaFormElement_header_accessor_storage = new WeakMap(), _JsonSchemaFormElement_widgets_accessor_storage = new WeakMap();
JsonSchemaFormElement.widgets = {};
JsonSchemaFormElement.groupRenderers = {};
export default JsonSchemaFormElement;
__decorate([
    property({ type: Object })
], JsonSchemaFormElement.prototype, "schema", null);
__decorate([
    property({ type: Object })
], JsonSchemaFormElement.prototype, "values", null);
__decorate([
    property({ type: Boolean })
], JsonSchemaFormElement.prototype, "formClasses", null);
__decorate([
    property()
], JsonSchemaFormElement.prototype, "buttonClasses", null);
__decorate([
    property()
], JsonSchemaFormElement.prototype, "header", null);
__decorate([
    property({ type: Object })
], JsonSchemaFormElement.prototype, "widgets", null);
JsonSchemaFormElement.registerGroupRenderer({
    id: 'default',
    tag: 's-json-schema-form-default-group-renderer',
});
JsonSchemaFormElement.registerGroupRenderer({
    id: 'stack',
    tag: 's-json-schema-form-stack-group-renderer',
});
JsonSchemaFormElement.define('s-json-schema-form', JsonSchemaFormElement, {});
__IconElement.define('s-icon', {
    type: 'outline',
});
//# sourceMappingURL=JsonSchemaFormElement.js.map