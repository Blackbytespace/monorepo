# Lotsof Lit Element

This class extends the wonderful [lit](https://lit.dev) library. His goal is to provide a solid base for your custom elements.

---

- [Lotsof Lit Element](#lotsof-lit-element)
  - [Features](#features)
  - [Usage](#usage)
  - [Attributes](#attributes)
  - [API](#api)
  - [Contribute](#contribute)

---

## Features

Here's some features that this class adds to the lit element base one:

- `mount`: lifecycle step.
- `mountWhen`: attribute that can be one of these values:
  - `direct`, `inViewport`, `nearViewport`, `enterViewport`, `interact`, `visible`, `domReady`.
- `saveState`: Save the state into `localStorage`.
- `isActive()` `true` if is in viewport, `false` if not.

---

## Usage

This class is meant to extend your custom element, just like the native Lit one. Here's how to do it:

```ts
import __LitElement from '@lotsof/lit-element`

// create your component
class MyCustomElement extends __LitElement {
    constructor() {
        super('my-cool-element', {
            mountWhen: 'nearViewport'
        });
    }

    render() {
        return html`
            <h1>Hello world</h1>
        `;
    }
}

// define it with optional default props
MyCustomElement.define('my-custom-element', {
    name: '...',
    // etc...
});
```

---

## Attributes

Here's all the attributes that you can pass to an extended LitElement:

```ts
/**
 * @attribute       {String}        id              The id of the component
 * @attribute       {String}        name            The name of the component
 * @attribute       {Boolean}       [verbose=false]         Specify if the component should be verbose or not
 * @attribute       {'inViewport'[]}      [activeWhen=[]]      Specify when the component is considered as active
 * @attribute       {'direct'|'inViewport'|'nearViewport'|'interact'|'visible'|'domReady'}      [mountWhen='direct']      Specify when the component should be mounted
 * @attribute       {Boolean}       [prefixEvent=true]      Specify if the event dispatched by the component should be prefixed by the component name
 * @attribute       {Boolean}       [adoptStyle=true]       Specify if the component should adopt the styles of the context when the shadow dom is used
 * @attribute       {Boolean}       [saveState=false]       Specify if the state of the component should be saved in the localStorage
 * @attribute       {String}        [stateId='']            Specify the id to use to save the state in the localStorage
 * @attribute       {Boolean}       [shadowDom=false]       Specify if the component should use the shadow dom or not
 */
```

---

## API

Here's all the methods available on an extended `LitElement`:

```ts
/**
 * @name            define
 * @type            Function
 * @static
 *
 * This static method allows you to define a custom element just like the `customElement.define` does.
 * The trick is that this define method will not initialize the component directly. It will
 * wait until it is near the viewport before actually creating a new element names "%tagName-up".
 * This will be the custom element that is registered and that will replace your "%tagName" HTMLElement.
 *
 * @param
 * @param       {Any}           props          The initial props to apply to your custom element
 * @param       {String}        tagName         The tagname you want to search in the DOM
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

/**
 * @name            setDefaultProps
 * @type            Function
 * @static
 *
 * This static method allows you to set some default props for some particular
 * component(s). You can target components using simple css selectorl like "my-component#cool".
 * Once the component is instanciated, it will check if some defaults are specified and
 * extends them with the passed props.
 *
 * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
 * @param     {Any}         props         An object of props you want to set defaults for
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

/**
 * @name            getDefaultProps
 * @type            Function
 * @static
 *
 * This static method allows you to get back some default props setted for a component/feature, etc...
 *
 * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
 * @return    {Any}                                 Some default props setted or an empty object
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

/**
 * @name           setState
 * @type            Function
 *
 * This method allows you to set the state of the component.
 * It will merge the new state with the existing one.
 * This state will be saved in the localStorage if the "saveState" attribute is set to true.
 *
 * @param           {Partial<LitElement['_state']>}          newState          The new state to set
 *
 * @since           1.0.0
 */

/**
 * @name           dispatch
 * @type            Function
 *
 * This method allows you to dispatch some CustomEvents from your component node itself.
 *
 * If the "prefixEvent" attribute is set to true, the event will be dispatched with the following names:
 * 1. An event called "%internalName.%eventName"
 * 2. An event called "%name.%eventName" if the "name" property is setted
 * 3. An event called "%tagName.%eventName" if the tagName is different from the internalName
 *
 * Otherwise, the event will be dispatched with the following names:
 * 1. An event called "%eventName"
 *
 * @param           {String}            eventName     The event name to dispatch
 * @param           {TLitElementDispatchSettings}          [settings={}]     The settings to use for the dispatch
 *
 * @since           1.0.0
 */

/**
 * @name          internalCls
 * @type          Function
 *
 * This method allows you to get a class that is based in on the internalName of the component.
 * This is useful to query some element(s) inside your component that used the `cls` method.
 *
 * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
 * @return        {String}                    The generated internalName based class that you can apply
 *
 * @since         1.0.0
 */

/**
 * @name          cls
 * @type          Function
 *
 * This method allows you to get a class that is based on the tagName of the component.
 *
 * If the "classesSchema" attribute is set to "full", the class will be generated like this:
 * 1. %internalName_%lowerCaseClassName
 * 2. %tagName_%lowerCaseClassName if the tagName is different from the internalName
 * 3. %name_%lowerCaseClassName if the "name" property is setted
 *
 * If the "classesSchema" attribute is set to "slim", the class will be generated like this:
 * 1. _%lowerCaseClassName
 *
 * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
 * @param         {TClassesSchema}       [classesSchema=this.classesSchema]         The schema to use to generate the class. Can be "slim" or "full"
 * @return        {String}                    The generated class that you can apply
 *
 * @since         1.0.0
 */

/**
 * @name           addEventListener
 * @type            Function
 *
 * This method allows you to add an event listener on the component itself.
 * It will automatically remove the listener when the component is disconnected and added again when connected.
 *
 * @param           {String}            type            The event type to listen for
 * @param           {EventListenerOrEventListenerObject}          listener        The listener to call when the event is triggered
 * @param           {boolean|AddEventListenerOptions}          [options]       Some options to pass to the addEventListener method
 *
 * @since           1.0.0
 */

/**
 * @name           addEventListenerOn
 * @type            Function
 *
 * This method allows you to add an event listener on any element.
 * It will automatically remove the listener when the component is disconnected and added again when connected.
 *
 * @param           {HTMLElement}            $elm            The element on which to add the event listener
 * @param           {String}            type            The event type to listen for
 * @param           {EventListenerOrEventListenerObject}          listener        The listener to call when the event is triggered
 * @param           {boolean|AddEventListenerOptions}          [options]       Some options to pass to the addEventListener method
 *
 * @since           1.0.0
 */

/**
 * @name      isMounted
 * @type      Function
 *
 * This method returns true if the component is mounted, false if not
 *
 * @return    {Boolean}       true if is mounted, false if not
 *
 * @since     1.0.0
 */

/**
 * @name            isInViewport
 * @type            Function
 *
 * true if the component is in the viewport, false if not
 *
 * @return         {Boolean}       true if in the viewport, false if not
 *
 * @since           1.0.0
 */
```

---

## Contribute

To contribute to this package, please [follow these guidelines](https://github.com/lotsofdev/monorepo/blob/master/CONTRIBUTE.md).

Everyone is welcome as long as they respect our [code of conduct](https://github.com/lotsofdev/monorepo/blob/master/CODEOFCONDUCT.md).
