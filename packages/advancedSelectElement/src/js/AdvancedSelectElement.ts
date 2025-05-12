import __LitElement from '@lotsof/lit-element';
import { __highlightText } from '@lotsof/sugar/string';
// @TODO            check why import does not work
// @ts-ignore
import { __i18n } from '@lotsof/i18n';
import {
  __distanceFromElementTopToViewportBottom,
  __distanceFromElementTopToViewportTop,
  __getStyleProperty,
  __nearestElement,
  __onScrollEnd,
} from '@lotsof/sugar/dom';
import { __stripTags } from '@lotsof/sugar/html';
import { __isFocusWithin } from '@lotsof/sugar/is';
import { __escapeQueue, __hotkey } from '@lotsof/sugar/keyboard';
import { __escapeRegexChars, __uniqid } from '@lotsof/sugar/string';
import { PropertyValueMap, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../src/css/AdvancedSelectElement.bare.css';
import type {
  TAdvancedSelectElementApi,
  TAdvancedSelectElementClasses,
  TAdvancedSelectElementItem,
  TAdvancedSelectElementItemsFunctionApi,
} from '../shared/AdvancedSelectElement.types.js';

/**
 * @name                AdvancedSelectElement
 * @as                  Advanced Select Input
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/AdvancedSelectElementInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-filtrable-einput
 * @platform            html
 * @status              beta
 *
 * This component represent a filtrable input to display and filter a list of items easily.
 *
 * @feature           Framework agnostic. Simply webcomponent.
 * @feature           Fully customizable
 * @feature           Built-in search
 *
 * @attribute       {String|Function}         [items]                         The items to display in the dropdown. Can be a JSON string, a url to an api endpoints, a string that represent a query selector to a script tag, or a function that return the items
 * @attribute       {String}        [value=value]                                   The value property to use to display the items
 * @attribute       {String}        [label=label]                                   The label property to use to display the items
 * @attribute       {Boolean}       [showKeywords=false]                            Specify if you want to show the keywords in the dropdown
 * @attribute       {String}        [emptyText=No items found...]                   The text to display when no items are found
 * @attribute       {String}        [loadingText=Loading, please wait...]           The text to display when the component is in loading state
 * @attribute       {Function}      [filterValuePreprocess]                         A function to preprocess the filter value before filtering the items
 * @attribute       {String}        [hotkey=null]                                   A hotkey to focus the input
 * @attribute       {Function}      [filterItems=null]                              A function to filter the items
 * @attribute       {Number}        [minChars=1]                                    The minimum characters to type before filtering the items
 * @attribute       {Array}         [filtrable=[id,value,label]]                    The properties to filter on
 * @attribute       {Array}         [highlightable=[label]]                         The properties to highlight in the dropdown
 * @attribute       {Function}      [templates=null]                                A function to render the templates
 * @attribute       {Number}        [closeTimeout=100]                              The timeout to wait before closing the dropdown
 * @attribute       {Boolean}       [notSelectable=false]                           Specify if the component is not selectable
 * @attribute       {Number}        [maxItems=-1]                                   The maximum items to display in the dropdown
 * @attribute       {TAdvancedSelectElementClasses}        [classes=null]                                  Some classes to apply to the different elements
 * @attribute       {Boolean}       [inline=false]                                  Specify if the dropdown should be displayed inline
 *
 * @event           sAdvancedSelect.items                Dispatched when the items are setted of updated
 * @event           sAdvancedSelect.select               Dispatched when an item has been selected
 * @event           sAdvancedSelect.preselect            Dispatched when an item has been preselected
 * @event           sAdvancedSelect.close                Dispatched when the dropdown is closed
 * @event           sAdvancedSelect.open                 Dispatched when the dropdown is opened
 * @event           sAdvancedSelect.reset                Dispatched when the input is resetted
 * @event           sAdvancedSelect.loading              Dispatched when the element enterd in loading state
 * @event           sAdvancedSelect.loaded               Dispatched when the element exit the loading state
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __AdvancedSelectElementDefine } from '@lotsof/advancedSelect-component';
 *
 * @snippet         __AdvancedSelectElementDefine($1)
 *
 * @install           shell
 * npm i @lotsof/advancedSelect-component
 *
 * @install           js
 * import __SAdvancedSelectElement from '@lotsof/advancedSelect-component';
 * __SAdvancedSelectElement.define();
 *
 * @example         html            Simple example
 * <template id="items">
 *   [{"title":"Hello","value":"hello"},{"title":"world","value":"world"}]
 * </template>
 * <advancedSelect items="#items" label="title" filtrable="title">
 *   <input type="text" class="s-input" placeholder="Type something..." />
 * </advancedSelect>
 *
 * @example         js
 * import __SAdvancedSelectElement from '@lotsof/advanced-select-element';
 * __SAdvancedSelectElement.define('my-cool-filtrable-input');
 *
 * @example         html        Custom templates and items
 * <my-cool-filtrable-input>
 *    <input type="text" class="s-input" placeholder="Type something..." />
 * </my-cool-filtrable-input>
 *
 * @example         js
 * import __SAdvancedSelectElement from '@lotsof/advanced-select-element';
 * __SAdvancedSelectElement.define('my-cool-filtrable-input', {
 *     items: async () => {
 *         // you can get your items however you want
 *         // const request = await fetch('...');
 *         // const items = await request.json();
 *         return [{title: 'Hello', value: 'World'},{title: 'Plop', value:'Yop}];
 *     }
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class AdvancedSelectElement extends __LitElement {
  // @state()
  private _displayedMaxItems: number = 0;

  @state()
  private _filterValue: string = '';

  @state()
  private _items: TAdvancedSelectElementItem[] = [];

  @state()
  private _filteredItems: TAdvancedSelectElementItem[] = [];

  @state()
  private _isLoading: boolean = false;

  @property()
  public items:
    | any[]
    | ((api: TAdvancedSelectElementItemsFunctionApi) => any[]) = [];

  @property()
  public value: string | Function = 'value';

  @property()
  public label: string | Function = 'label';

  @property({ type: Boolean })
  public showKeywords: boolean = false;

  @property({ type: String })
  public emptyText: string = __i18n('No items found...');

  @property({ type: String })
  public loadingText: string = __i18n('Loading, please wait...');

  @property({ type: Function })
  public filterValuePreprocess?: Function;

  @property({ type: String })
  public hotkey?: string;

  @property({ type: Function })
  public filterItems?: Function;

  @property({ type: Number })
  public minChars: number = 1;

  @property({ type: Array })
  public filtrable: string[] = [];

  @property({ type: Array })
  public highlightable: string[] = [];

  @property({ type: Object })
  public templates?: (api: TAdvancedSelectElementApi) => any;

  @property({ type: Number })
  public closeTimeout: number = 100;

  @property({ type: Boolean })
  public notSelectable: boolean = false;

  @property({ type: Number })
  public maxItems: number = -1;

  @property({ type: Object })
  public classes: TAdvancedSelectElementClasses = {};

  @property({ type: Boolean })
  public inline: boolean = false;

  private _$container: HTMLElement = document.createElement('div');
  private _$list: HTMLElement = document.createElement('ul');
  private _$dropdown: HTMLElement = document.createElement('div');
  private _$input: HTMLInputElement = document.createElement('input');
  private _$form?: HTMLFormElement;
  private _templatesFromHtml: Record<string, string> = {};
  private _isArrowUsed: boolean = false;
  private _isArrowUsedTimeout?: any;
  private _baseTemplates = (api: TAdvancedSelectElementApi): any => {};

  constructor() {
    super('s-advanced-select');
  }

  protected async mount() {
    this._displayedMaxItems = this.maxItems;

    // filtrable
    if (typeof this.filtrable === 'string') {
      this.filtrable = (<string>this.filtrable).split(',').map((f) => f.trim());
    }
    if (!this.filtrable.length) {
      this.filtrable.push('id');
      this.filtrable.push('value');
      if (typeof this.label === 'string') {
        this.filtrable.push(this.label);
      }
    }
    if (!this.highlightable.length) {
      if (typeof this.label === 'string') {
        this.highlightable.push(this.label);
      }
    }
    if (!this.filtrable.length) {
      throw new Error(
        `Sorry but you have to specify at least one property in the "filtrable" item property...`,
      );
    }

    // @ts-ignore
    this._baseTemplates = ({ type, item, $items, html }) => {
      switch (type) {
        case 'item':
          return html`
            ${unsafeHTML(
              typeof this.label === 'function'
                ? __i18n(this.label({ item }))
                : __i18n(item[this.label]),
            )}
          `;
          break;
        case 'group':
          return html` <div class="${this.cls('_group-label')}">
              <span class="${this.cls('_group-label-inner')}">
                ${__i18n(item.label)}
              <span>
            </div>
            <div class="${this.cls('_group-items')}">
              <ul class="${this.cls('_group-items-inner')}">${$items}</ul>
          </div>`;
          break;
        case 'empty':
          return html` <div>${__i18n(this.emptyText)}</div> `;
          break;
        case 'loading':
          return html`
            <div class="${this.cls('_loading')}">
              ${__i18n(this.loadingText)}
            </div>
          `;
          break;
      }
    };

    // grab templates
    this._grabTemplatesFromDom();

    // init listeners (hotkeys, etc...)
    this._initListeners();

    // if we have the focus in
    if (__isFocusWithin(this as HTMLElement)) {
      setTimeout(() => {
        this.focus();
      });
    }
  }

  _loadingTimeout: any;
  protected updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    if (changedProperties.has('_isLoading')) {
      if (this._isLoading) {
        this.dispatch('loading');
      } else {
        this.dispatch('loaded');
      }
    }

    if (this._filterValue) {
      this.classList.add('-filtered');
    } else {
      this.classList.remove('-filtered');
    }
    if (this._isLoading) {
      this.classList.add('-loading');
    } else {
      this.classList.remove('-loading');
    }
    if (!this._filteredItems.length) {
      this.classList.add('-empty');
    } else {
      this.classList.remove('-empty');
    }
    if (this.inline) {
      this.classList.add('-inline');
    } else {
      this.classList.remove('-inline');
    }
  }

  protected async firstUpdated() {
    // input
    this._$input =
      <any>this.querySelector('input') ?? document.createElement('input');
    if (!this._$input?.parentElement) {
      this.appendChild(this._$input);
    }
    this._$input.setAttribute('autocomplete', 'off');
    this._$form = this._$input.form as HTMLFormElement;

    // prevent from sending form if search is opened
    this.addEventListenerOn(this._$input, 'keydown', (e: any) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    });
    this.addEventListenerOn(this._$form, 'submit', (e) => {
      if (this.isActive()) {
        e.preventDefault();
      }
    });

    // handle update on key event
    this.addEventListenerOn(this._$input, 'keydown', async (e) => {
      if (!this.isActive()) {
        return;
      }

      // nothing has changed
      if (this._filterValue === (<HTMLInputElement>e.target).value) {
        return;
      }

      this.resetPreselected();
      this.resetSelected();

      const value = (<HTMLInputElement>e.target).value;
      this._filterValue = value;
      this._displayedMaxItems = this.maxItems;

      // if passed a function to the items property,
      // we refresh the items at eash keystroke
      if (typeof this.items === 'function') {
        await this.refreshItems();
      } else {
        // just filterinf the current items
        this._filterItems();
      }
    });

    // handle update on focus
    this.addEventListenerOn(this._$input, 'focus', (e) => {
      if (!this.isActive()) {
        return;
      }
      const value = (<HTMLInputElement>e.target).value;
      this._filterValue = value;
      this._open();
      this._updateListSizeAndPosition();
    });

    // input class
    this._$input.classList.add(...this.cls('_input'));
    if (this.classes.input) {
      this._$input.classList.add(this.classes.input);
    }

    // container class
    this._$container = this as HTMLElement;
    this._$container.classList.add(...this.cls());
    if (this.classes.container) {
      this._$container.classList.add(this.classes.container);
    }

    // get the list and the dropdown
    this._$list = this.querySelector('ul') as HTMLUListElement;
    this._$dropdown = this.querySelector(
      `.${this.internalCls('_dropdown')}`,
    ) as HTMLElement;

    // handle scroll behaviors
    this.addEventListenerOn(document, 'scroll', () => {
      this._updateListSizeAndPosition();
    });
    this._updateListSizeAndPosition();
    __onScrollEnd(this._$list, () => {
      if (this.maxItems === -1) {
        return;
      }
      this._displayedMaxItems = (this._displayedMaxItems ?? 0) + this.maxItems;
      this._filterItems();
    });

    // handle arrows
    this.addEventListenerOn(document, 'keyup', (e: any) => {
      if (!this.isActive()) return;
      if (!this._filteredItems.length) return;

      const directionsMap = {
        ArrowDown: 'bottom',
        ArrowUp: 'top',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };
      if (!directionsMap[e.key]) return;

      // mark the arrow as used
      this._isArrowUsed = true;
      clearTimeout(this._isArrowUsedTimeout);
      this._isArrowUsedTimeout = setTimeout(() => {
        this._isArrowUsed = false;
      }, 100);

      const $items = this.querySelectorAll(
          `.${this.internalCls('_item')}.-match`,
        ) as NodeListOf<HTMLElement>,
        $from = (this.querySelector(
          `.${this.internalCls('_item')}.-preselected`,
        ) ||
          this.querySelector(`.${this.internalCls('_item')}.-selected`) ||
          this.querySelectorAll(
            `.${this.internalCls('_item')}`,
          )[0]) as HTMLElement;

      const preselected = this.getPreselectedItem();
      if (!preselected) {
        const firstItemId = $items[0]?.dataset.id;
        if (firstItemId) {
          this.preselect(firstItemId, {
            scrollIntoView: true,
          });
        }
      } else {
        let $nearestElement = __nearestElement($from, $items, {
          direction: directionsMap[e.key],
        });
        if (!$nearestElement) {
          return;
        }
        const id = $nearestElement.dataset.id;
        if (id) {
          this.preselect(id, {
            scrollIntoView: true,
          });
        }
      }
    });

    // handle return key
    this.addEventListenerOn(document, 'keyup', (e: any) => {
      if (e.key !== 'Enter') {
        return;
      }

      e.preventDefault();

      // protect agains actions when not focus
      if (!this.isActive()) return;
      this.select();
    });

    // restore value from state
    if (this._filterValue) {
      this.setSearch(this._filterValue);
      // this._$input.value = this._filterValue;
    }

    // open if a value exists
    if (this._$input.value) {
      this._filterValue = this._$input.value;
    }

    // when inlinem refresh items directly
    if (this.inline) {
      this.refreshItems();
    }
  }

  private _initListeners(): void {
    // handle hotkeys
    if (this.hotkey) {
      __hotkey(this.hotkey, () => {
        this.focus();
      });
    }
  }

  private _grabTemplatesFromDom() {
    this.querySelectorAll('template').forEach(($template) => {
      if (!$template.hasAttribute('type')) return;
      // @ts-ignore
      this._templatesFromHtml[$template.getAttribute('type')] =
        $template.innerHTML;
    });
  }

  private _renderTemplate(api: Partial<TAdvancedSelectElementApi>): any {
    const finalApi: TAdvancedSelectElementApi = {
      type: 'item',
      item: null,
      $items: [],
      html: html,
      unsafeHTML: unsafeHTML,
      idx: 0,
      ...api,
    };

    if (this.templates) {
      const res = this.templates(finalApi);
      if (res) return res;
    }
    // from template tags
    if (this._templatesFromHtml[finalApi.type]) {
      return html` ${unsafeHTML(this._templatesFromHtml[finalApi.type])} `;
    }
    // @ts-ignore
    return this._baseTemplates(finalApi);
  }

  /**
   * @name          preselect
   * @type          Function
   *
   * Preselect an item in the dropdown
   *
   * @param       {String|TAdvancedSelectElementItem}        item        The item to preselect. Can be a string that represent the id of the item, or the item itself
   * @param       {Object}        [settings={}]           Some settings to configure your preselection
   *
   * @since       1.0.0
   */
  public preselect(
    item: string | TAdvancedSelectElementItem,
    settings?: {
      preventFocus?: boolean;
      scrollIntoView?: boolean;
    },
  ): void {
    if (typeof item === 'string') {
      item = this.getItemById(item);
    }
    // reset preselected
    const preselectedItem = this.getPreselectedItem();
    if (preselectedItem) {
      preselectedItem.state.preselected = false;
    }
    // check if the component is in not selectable mode
    if (this.notSelectable) return;
    // do not preselect if not match the search
    if (!item.state.match) return;
    // make sure the element is visible
    if (settings?.scrollIntoView) {
      const $item = this.getItemDomElement(item);
      if ($item) {
        $item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
    // set the new preselected
    item.state.preselected = true;
    // set focus in the input
    if (!settings?.preventFocus) {
      setTimeout(() => {
        this.focus();
      });
    }
    // make sure the ui is up to date
    this.requestUpdate();
  }

  /**
   * @name        resetPreselected
   * @type        Function
   *
   * Reset the preselected item
   *
   * @since       1.0.0
   */
  public resetPreselected(): void {
    const preselectedItem = this.getPreselectedItem();
    if (!preselectedItem) return;
    preselectedItem.state.preselected = false;
  }

  /**
   * @name        setSearch
   * @type        Function
   *
   * Set the search value and refresh items accordingly
   *
   * @param       {String}        value       The value to set
   *
   * @since       1.0.0
   */
  public async setSearch(value: string): Promise<void> {
    console.log('setSearch', value);
    this._$input.value = value;
    this._filterValue = value;
    await this.refreshItems();
    this.requestUpdate();
  }

  /**
   * @name       select
   * @type       Function
   *
   * Select an item in the dropdown
   *
   * @param       {String|TAdvancedSelectElementItem}        item        The item to select. Can be a string that represent the id of the item, or the item itself
   *
   * @since       1.0.0
   */
  public select(
    item: string | TAdvancedSelectElementItem = this.getPreselectedItem(),
  ): void {
    if (typeof item === 'string') {
      item = this.getItemById(item);
    }
    // reset preselected
    const preselectedItem = this.getPreselectedItem();
    if (preselectedItem) {
      preselectedItem.state.preselected = false;
    }
    // reset selected
    const selectedItem = this.getSelectedItem();
    if (selectedItem) {
      selectedItem.state.selected = false;
    }
    // check if the component is in not selectable mode
    if (this.notSelectable) return;
    // do not select if not match the search
    if (!item.state.match) return;
    // set the new preselected
    item.state.selected = true;
    // set focus in the input
    setTimeout(() => {
      if (!item.preventSet) {
        this.setSearch(item.value ?? item.id);
      } else {
        this.setSearch('');
      }
      if (item.preventClose) {
        this.focus();
      }
    });

    // close if not prevented
    if (!item.preventClose) {
      this._close();
    }

    // dispatch an event
    if (!item.preventSelect) {
      console.log('dispatch select', item);
      this.dispatch('select', {
        detail: {
          item,
          $elm: this.querySelector(
            `.${this.internalCls('_item')}[data-internal-id="${
              item._internalId
            }"]`,
          ),
        },
      });
    }

    // make sure the ui is up to date
    this.requestUpdate();
  }

  public resetSelected(): void {
    const item = this.getSelectedItem();
    if (!item) return;
    item.state.selected = false;
  }

  public getItemDomElement(item: TAdvancedSelectElementItem): HTMLElement {
    return this.querySelector(
      `.${this.internalCls('_item')}[data-id="${item.id}"]`,
    ) as HTMLElement;
  }

  /**
   * @name        reset
   * @type        Function
   *
   * Reset the advanced select (preselected, selected, search, etc...)
   *
   * @since       1.0.0
   */
  public reset() {
    this.resetPreselected();
    this.resetSelected();
    this.setSearch('');
    this.dispatch('reset');
  }

  /**
   * @name        getItemById
   * @type        Function
   *
   * Get an item by it's id
   *
   * @param       {String}        id        The id of the item to get
   * @return      {TAdvancedSelectElementItem}        The item found
   *
   * @since       1.0.0
   */
  public getItemById(id: string): TAdvancedSelectElementItem {
    return this._filteredItems.find(
      (item) => item.id === id,
    ) as TAdvancedSelectElementItem;
  }

  /**
   * @name       getPreselectedItem
   * @type       Function
   *
   * Get the preselected item
   *
   * @return      {TAdvancedSelectElementItem}        The preselected item
   *
   * @since       1.0.0
   */
  public getPreselectedItem(): TAdvancedSelectElementItem {
    return this._filteredItems.find(
      (item) => item.state.preselected,
    ) as TAdvancedSelectElementItem;
  }

  /**
   * @name        getSelectedItem
   * @type        Function
   *
   * Get the selected item
   *
   * @return      {TAdvancedSelectElementItem}        The selected item
   *
   * @since       1.0.0
   */
  public getSelectedItem(): TAdvancedSelectElementItem {
    return this._filteredItems.find(
      (item) => item.state.selected,
    ) as TAdvancedSelectElementItem;
  }

  /**
   * @name        getMatchItems
   * @type        Function
   *
   * Get the items that match the search
   *
   * @return      {TAdvancedSelectElementItem[]}        The items that match the search
   *
   * @since       1.0.0
   */
  public getMatchItems(): TAdvancedSelectElementItem[] {
    return this._filteredItems.filter((item) => item.state.match);
  }
  public async _open(): Promise<void> {
    __escapeQueue(() => {
      if (!this.isActive()) return;
      this.reset();
      this._close();
    });
    this.dispatch('open');
    await this.refreshItems();
  }
  public _close(): void {
    (<HTMLElement>document.activeElement)?.blur();
    this.dispatch('close');
  }

  /**
   * @name        focus
   * @type        Function
   *
   * Focus the input and open the dropdown
   *
   * @since       1.0.0
   */
  public focus(): void {
    this._$input.focus();
  }

  /**
   * @name       blur
   * @type       Function
   *
   * Blur the input and close the dropdown
   *
   * @since       1.0.0
   */
  public blur(): void {
    this._$input.blur();
    this._close();
  }

  private _isLoadingTimeout: any;

  /**
   * @name        refreshItems
   * @type        Function
   *
   * Refresh the items in the dropdown
   *
   * @since       1.0.0
   */
  public async refreshItems(): Promise<void> {
    clearTimeout(this._isLoadingTimeout);
    this._isLoadingTimeout = setTimeout(() => {
      this._isLoading = true;
    }, 100);

    if (this.items) {
      if (typeof this.items === 'string') {
        try {
          this._items = JSON.parse(this.items);
        } catch (e) {
          const $itemsElm: HTMLElement | null = document.querySelector(
            this.items,
          );
          if ($itemsElm) {
            this._items = JSON.parse((<HTMLElement>$itemsElm).innerHTML.trim());
          }
        }
      } else if (typeof this.items === 'function') {
        this._items = await this.items({
          search: this._filterValue,
          items: this._items,
        });
      } else {
        this._items = this.items;
      }

      this.dispatch('items', {
        detail: {
          items: this._items,
        },
      });
    }

    // init items (state, id, etc...)
    this._initItems(this._items);

    // filter items
    await this._filterItems();

    // update component
    clearTimeout(this._isLoadingTimeout);
    this._isLoading = false;

    // restore
    const $selected = this.querySelector(
      `.${this.internalCls('_item')}.-selected`,
    );
    if ($selected) {
      // @ts-ignore
      this.preselect($selected?.dataset.id, {
        preventFocus: true,
        scrollIntoView: true,
      });
      return;
    } else {
      // preselect the first item in the list
      if (this._filteredItems.length) {
        this.preselect(this._filteredItems[0], {
          preventFocus: true,
          scrollIntoView: true,
        });
      }
    }
  }

  private _initItems(items: any[]): TAdvancedSelectElementItem[] {
    return items.map((item) => {
      if (item.items) {
        item.items = this._initItems(item.items);
      }
      return this._initItem(item);
    }) as TAdvancedSelectElementItem[];
  }

  private _initItem(
    item: Partial<TAdvancedSelectElementItem>,
  ): TAdvancedSelectElementItem | undefined {
    if (item.type === 'group') {
      return;
    }

    if (!item.state) {
      item.state = {
        match: true,
        preselected: false,
        selected: false,
      };
    }
    if (!item.id) {
      item.id = __uniqid();
    }
    if (!item.type) {
      item.type = 'item';
    }
    return item as TAdvancedSelectElementItem;
  }

  private _getItemsOnly(): TAdvancedSelectElementItem[] {
    const itemsOnly: any[] = [];
    this._items.forEach((item) => {
      if (item.type == 'group') {
        item.items?.forEach((item) => {
          itemsOnly.push(item);
        });
      } else {
        itemsOnly.push(item);
      }
    });

    return itemsOnly;
  }

  private async _filterItems() {
    if (this._filterValue && this._filterValue.length < this.minChars) {
      return;
    }

    this._isLoading = true;

    const itemsOnly = this._getItemsOnly();

    let _filterValue = this._filterValue;
    if (this.filterValuePreprocess) {
      _filterValue = this.filterValuePreprocess(_filterValue);
    }
    _filterValue = __escapeRegexChars(_filterValue);

    let _filteredItems = itemsOnly;

    // custom function
    if (this.filterItems) {
      _filteredItems = await this.filterItems(
        _filteredItems,
        _filterValue,
        this,
      );
    } else {
      let matchedItemsCount = 0;
      if (!this.filtrable.length) return true;
      _filteredItems = _filteredItems.filter((item) => {
        let matchFilter = false;
        for (let i = 0; i < Object.keys(item).length; i++) {
          const propName = Object.keys(item)[i];

          if (typeof item[propName] !== 'string') continue;

          const propValue = __stripTags(item[propName]);

          // store original value
          if (!item._original) {
            Object.defineProperty(item, `_original`, {
              value: {},
              writable: true,
              configurable: false,
              enumerable: false,
            });
          }
          if (!item[`_original`][propName]) {
            item[`_original`][propName] = item[propName];
          }

          // check if the current propName is specified in the filtrable list
          if (this.filtrable.indexOf(propName) !== -1) {
            const searchParts = _filterValue
              .split(' ')
              .map((v) => v.replace(/[^a-zA-Z0-9 ]/g, '').trim())
              .filter((v) => v !== '');

            const reg = new RegExp(
              `${_filterValue}`
                .split(' ')
                .map((v) => {
                  return v.replace(/[^a-zA-Z0-9 ]+/g, '').trim();
                })
                .join('|'),
              'gi',
            );

            if (propValue.match(reg)) {
              matchFilter = true;
              if (
                this.highlightable.includes(propName) &&
                _filterValue &&
                _filterValue !== ''
              ) {
                let finalString: string = item._original[propName];
                finalString = __highlightText(finalString, searchParts, {
                  class: this.cls('_highlight').join(' '),
                });
                item[propName] = finalString;
              } else {
                item[propName] = item._original[propName];
              }
            } else {
              item[propName] = item._original[propName];
            }
          }
        }
        if (matchFilter) {
          matchedItemsCount++;
        }
        item.state.match = matchFilter;
        return matchFilter;
      });
    }

    this._filteredItems = _filteredItems;
    this._isLoading = false;
  }

  /**
   * Maintain the dropdown position and size
   */
  private _updateListSizeAndPosition() {
    if (!this.isActive() || this.inline) return;
    if (!this._$dropdown) return;

    const marginTop = __getStyleProperty(this._$dropdown, 'marginTop'),
      marginBottom = __getStyleProperty(this._$dropdown, 'marginBottom');
    const distanceTop = __distanceFromElementTopToViewportTop(this._$input);
    const distanceBottom =
      __distanceFromElementTopToViewportBottom(this._$input) -
      this._$input.clientHeight;
    let maxHeight;

    if (distanceTop > distanceBottom) {
      this._$container.classList.add('-top');
      this._$dropdown.style.top = `auto`;
      this._$dropdown.style.bottom = `calc(100% - ${marginBottom})`;
      maxHeight = distanceTop - parseInt(marginTop);
    } else {
      this._$container.classList.remove('-top');
      this._$dropdown.style.bottom = `auto`;
      this._$dropdown.style.top = `calc(100% - ${marginTop})`;
      maxHeight = distanceBottom - parseInt(marginBottom);
    }

    this._$dropdown.style.maxHeight = `${maxHeight}px`;
  }

  /**
   * This function just remove a keyword from the input and filter the items again
   */
  private _removeKeyword(keyword: string): void {
    const newValue = this._filterValue
      .split(' ')
      .filter((k) => k !== keyword)
      .join(' ');
    this.setSearch(newValue);
  }

  private _renderItems(
    items: TAdvancedSelectElementItem[],
    inGroup: boolean = false,
  ): any {
    return html`${items.map((item, idx) => {
      return this._renderItem(item, idx, inGroup);
    })}`;
  }

  private _renderItem(
    item: TAdvancedSelectElementItem,
    idx: number,
    inGroup: boolean = false,
  ): any {
    this._currentItemIdx++;

    if (!item._internalId) {
      Object.defineProperty(item, '_internalId', {
        value: `s-${__uniqid()}`,
        writable: false,
        enumerable: false,
        configurable: false,
      });
    }

    if (
      this.maxItems !== -1 &&
      this._currentItemIdx > this._displayedMaxItems
    ) {
      return;
    }

    return html`
      <li
        data-id="${item.id}"
        data-internal-id="${item._internalId}"
        @pointerup=${() => this.select(item)}
        @mouseover=${() => {
          if (this._isArrowUsed) return;
          this.preselect(item);
          this.requestUpdate();
        }}
        style="z-index: ${999999999 - idx}"
        tabindex="-1"
        class="${this.cls('_item')} ${this.classes.item} ${inGroup
          ? this.cls('_group-item')
          : ''} ${item.state?.selected ? '-selected' : ''} ${item.state
          ?.preselected
          ? '-preselected'
          : ''} ${this._filterValue ? '-filtered' : ''} ${item.state?.match
          ? '-match'
          : ''}"
      >
        ${this._renderTemplate({
          type: item.type ?? 'item',
          item,
          idx,
        })}
      </li>
    `;
  }

  private _currentItemIdx = 0;
  public render() {
    this._currentItemIdx = 0;

    const $before = this._renderTemplate({
        type: 'before',
      }),
      $after = this._renderTemplate({
        type: 'after',
      }),
      $empty = this._renderTemplate({
        type: 'empty',
      });

    return html`
      <div class="${this.cls('_dropdown')} ${this.classes.dropdown}">
        ${$before
          ? html`
              <div
                class="${this.cls('_before')} ${this.classes.before}"
                tabindex="-1"
              >
                ${$before}
              </div>
            `
          : ''}
        ${this._$input && this._$input.value && this.showKeywords
          ? html`
              <div
                tabindex="-1"
                class="${this.cls('_keywords')} ${this.classes.keywords}"
              >
                ${this._$input.value
                  .split(' ')
                  .filter((s) => s !== '')
                  .map(
                    (keyword) => html`
                      <span
                        tabindex="-1"
                        @click=${() => this._removeKeyword(keyword)}
                        class="${this.cls('_keyword')}"
                        >${__i18n(keyword)}</span
                      >
                    `,
                  )}
              </div>
            `
          : ''}
        <ul class="${this.cls('_items')} ${this.classes.items}">
          ${this._isLoading
            ? html`
                <li class="${this.classes.item} ${this.cls('_loading')}">
                  ${this._renderTemplate({
                    type: 'loading',
                  })}
                </li>
              `
            : !this._isLoading && this._filteredItems.length <= 0 && $empty
            ? html`
                <li class="${this.classes.item} ${this.cls('_empty')}">
                  ${$empty}
                </li>
              `
            : !this._isLoading
            ? this._items.map((item, idx) => {
                switch (item.type) {
                  case 'group':
                    const renderedItems = this._renderItems(
                      item.items ?? [],
                      true,
                    );
                    return html`
                      <li
                        class="${this.classes.group} ${this.cls('_group')}"
                        group="${item[this.label as string] ??
                        item.label ??
                        item.title ??
                        item.name}"
                      >
                        ${this._renderTemplate({
                          type: 'group',
                          $items: renderedItems,
                          item,
                        })}
                      </li>
                    `;
                    break;
                  default:
                    return html` ${this._renderItem(item, idx)} `;
                    break;
                }
              })
            : ''}
        </ul>
        ${$after
          ? html`
              <div
                class="${this.cls('_after')} ${this.classes.after}"
                tabindex="-1"
              >
                ${$after}
              </div>
            `
          : ''}
      </div>
    `;
  }
}
