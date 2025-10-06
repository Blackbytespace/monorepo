import LitElement from '@blackbyte/lit-element';
import { __copyText } from '@blackbyte/sugar/clipboard';
import { html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { codeToHtml } from 'shiki';
import '../../src/css/fluidMenu.element.css';

/**
 * @name                CodeElement
 * @as                  Code Element
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/codeElement.types.ts
 * @platform            html
 * @status              beta
 *
 * Simple code element that allows you to display code snippets with syntax highlighting
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { CodeElement } from '@blackbyte/code-element';
 *
 * @snippet         CodeElement($1)
 *
 * @install           shell
 * npm i @blackbyte/code-element
 *
 * @install           js
 * import CodeElement from '@blackbyte/code-element';
 * CodeElement.define();
 *
 * @example         html            Simple example
 * <s-code language="javascript">
 *   console.log('Hello World');
 * </s-code>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default class FluidMenuElement extends LitElement {
  public state = {
    tree: [],
  };

  constructor() {
    super('s-fluid-menu');
  }

  private addClasses(): void {
    const $links = this.querySelectorAll('a[href]');
    for (let $link of $links) {
      $link.classList.add(...this.cls('_link'));
    }
    const $externalLinks = this.querySelectorAll('a:not([href^="#"])');
    for (let $link of $externalLinks) {
      $link.classList.add(...this.cls('-external'));
    }
    const $navs = this.querySelectorAll('nav');
    for (let $nav of $navs) {
      $nav.classList.add(...this.cls('_nav'));
    }
    const $lists = this.querySelectorAll('ol, ul, dl');
    for (let $list of $lists) {
      $list.classList.add(...this.cls('_list'));

      let idx = 0;
      for (let $listItem of $list.children) {
        $listItem.style.setProperty('--idx', idx);
        idx++;
      }
    }
    const listsItems = this.querySelectorAll('li, dt, dd');
    for (let listItem of listsItems) {
      listItem.classList.add(...this.cls('_list-item'));
    }
  }

  private getLevelOfLink($link: HTMLElement): number {
    let $current = $link;
    let level = 0;
    while ($current !== this) {
      $current = $current.parentElement;
      if ($current.tagName === 'NAV') {
        level++;
      }
    }
    return level - 1;
  }

  firstUpdated() {
    super.firstUpdated();

    // add the classes
    this.addClasses();

    // handle click on items
    this.addEventListener('click', (e) => {
      if (
        e.target.tagName === 'A' &&
        e.target.getAttribute('href')?.startsWith('#')
      ) {
        const anchor = e.target.getAttribute('href');

        // prevent default to make our own
        e.preventDefault();

        // get the level of the clicked link
        const linkLevel = this.getLevelOfLink(e.target);

        // check if the clicked item already exists in the tree
        const exists = this.state.tree.includes(anchor);

        // add the clicked anchor in the tree
        this.state.tree.push(anchor);

        // splice the tree depending if the clicked
        // item is an existing one in the tree, meaning that
        // we must go "back"
        this.state.tree.splice(linkLevel + (exists ? 0 : 1));

        // apply update
        this._update();

        // write state
        this.writeState();
      }
    });

    // apply the update at start
    this._update();

    setTimeout(() => {
      this.classList.add('-ready');
    }, 100);
  }

  private _update() {
    const $links = this.querySelectorAll('a[href^="#"]');
    for (let $link of $links) {
      const linkAnchor = $link.getAttribute('href');

      if (this.state.tree.includes(linkAnchor)) {
        $link.classList.add('-active');
      } else {
        $link.classList.remove('-active');
      }
    }

    this.requestUpdate();
  }

  public render() {
    return html`<div class="${this.cls('_wrapper')}"></div>`;
  }
}
