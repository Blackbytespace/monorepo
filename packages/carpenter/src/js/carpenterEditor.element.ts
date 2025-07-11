import __IconElement from '@blackbyte/icon-element';
import '@blackbyte/json-schema-form';
import __JsonSchemaFormElement from '@blackbyte/json-schema-form';
import __LitElement from '@blackbyte/lit-element';
import { __copyText } from '@blackbyte/sugar/clipboard';
import { __isInIframe } from '@blackbyte/sugar/is';
import { type THotkeySettings } from '@blackbyte/sugar/keyboard';
import { __clone } from '@blackbyte/sugar/object';
import '@fontsource/poppins';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import {
  TCarpenterComponent,
  TCarpenterGroup,
} from '../shared/carpenter.type.js';
import __Carpenter from './carpenter.js';

export default class CarpenterEditorElement extends __LitElement {
  @property({ type: Boolean })
  public lnf: boolean = false;

  @property({ type: Boolean })
  public addInternalName: boolean = false;

  @property({ type: Object })
  public advancedGroup: TCarpenterGroup = {
    id: 'advanced',
    title: 'Advanced',
    type: 'stack',
    description: 'Advanced options for the component',
    icon: 'cog',
    buttonText: 'Open advanced options',
  };

  private _$jsonSchemaForm?: __JsonSchemaFormElement;

  constructor() {
    super('s-carpenter-editor');
    this.saveState = true;
  }

  public get selectedComponent(): TCarpenterComponent | undefined {
    return __Carpenter.selectedComponent;
  }

  public get preselectedComponent(): TCarpenterComponent | null {
    return __Carpenter.preselectedComponent;
  }

  public update(changedProperties: any): void {
    super.update(changedProperties);

    // get the json schema form
    if (!this._$jsonSchemaForm) {
      this._$jsonSchemaForm = this.querySelector(
        's-json-schema-form',
      ) as __JsonSchemaFormElement;
    }

    if (this._$jsonSchemaForm) {
      // @TODO       find a better way to update the form without using setTimeout
      setTimeout(() => {
        // @ts-ignore
        this._$jsonSchemaForm.requestUpdate();
      });
    }
  }

  async mount() {
    // if not in an iframe, init the environment
    // by creating an iframe and load the factory deamon
    // inside it
    if (__isInIframe()) {
      return;
    }

    // request update when something changes
    // in the carpenter "store"
    __Carpenter.addEventListener('update', (e: CustomEvent) => {
      this.requestUpdate();
    });

    // init the listeners like escape key, etc...
    this._initListeners(document);

    // dispatch the ready event
    this.dispatch('ready', {
      bubbles: true,
      cancelable: false,
      detail: this,
    });
  }

  private _initListeners(context: Document): void {
    const hotkeySettings: Partial<THotkeySettings> = {
      ctx: context,
    };

    // __hotkey(
    //   'escape',
    //   (e) => {
    //     this._currentAction = null;
    //   },
    //   hotkeySettings,
    // );
    // __hotkey(
    //   'cmd+s',
    //   (e) => {
    //     this._currentAction = 'saveValues';
    //   },
    //   hotkeySettings,
    // );
  }

  private _renderEditor(): any {
    if (!this.selectedComponent) {
      return;
    }

    return html`<div
      class="${`${this.cls('_editor')} ${this.lnf ? '-lnf' : ''}`}"
    >
      <div class="${this.cls('_editor-inner')}">
        <s-json-schema-form
          id="s-carpenter-json-schema-form"
          name="s-carpenter-json-schema-form"
          .lnf=${this.lnf}
          .buttonClasses=${true}
          .formClasses=${true}
          .header=${true}
          .verbose=${this.verbose}
          .schema=${__clone(this.selectedComponent.schema)}
          .values=${__clone(this.selectedComponent.values)}
          @s-json-schema-form.update=${(e: CustomEvent) => {
            if (!this.selectedComponent) {
              return;
            }
            __Carpenter.applyUpdate(this.selectedComponent, e.detail.update);
          }}
        ></s-json-schema-form>
      </div>
    </div>`;
  }

  public _renderTree(): any {
    return html`<nav class="${this.cls('_tree')}">
      <header class=${this.cls('_header')}>
        <h2 class=${this.cls('_header-title')}>Inspector</h2>
      </header>

      <ol class="${this.cls('_tree-list')}">
        ${Object.entries(__Carpenter.components ?? {}).map(
          ([id, component]) => {
            // if the component is not visible, skip it
            return html`
              <li
                class="${this.cls('_tree-item')}"
                @mouseenter=${() => {
                  __Carpenter.preselectComponent(component);
                }}
              >
                <button
                  class="${this.cls('_tree-item-button')}"
                  @click=${() => {
                    __Carpenter.selectComponent(component);
                  }}
                >
                  <s-icon name="${component.icon}"></s-icon>
                  <span class="${this.cls('_tree-item-name')}">
                    ${component.values.internalName ?? component.name}
                  </span>
                  ${component.values?.id
                    ? html`
                        <span
                          class="${this.cls('_tree-item-id')}"
                          @click=${(e: MouseEvent) => {
                            e.stopPropagation();
                            __copyText(component.values.id ?? '');
                          }}
                          >#${component.values.id}
                          <s-icon name="clipboard-document-list"></s-icon>
                        </span>
                      `
                    : ''}
                </button>
              </li>
            `;
          },
        )}
      </ol>
    </nav>`;
  }

  public render() {
    return html`
      ${__Carpenter.selectedComponent
        ? this._renderEditor()
        : this._renderTree()}
    `;
  }
}

CarpenterEditorElement.define('s-carpenter-editor');
__IconElement.define('s-icon', {
  type: 'solid',
});
