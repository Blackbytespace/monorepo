# Lotsof monorepo

Welcome in the Lotsof monorepo.

## Glossary

1. [Packages](#packages)
2. [Requirements](#requirements)
3. [Clone repository](#clone)
4. [Install](#install)
5. [Develop](#develop)

## Packages

Here you can get access to all the packages developed by our team. Things like:

#### Custom Elements

##### [Lit Element](https://github.com/lotsofdev/lit-element) **TS**

Base class on top of the wonderful [Lit](https://lit.dev) library that add some features like `mountWhen`, etc...

##### [Advanced Select Element](https://github.com/lotsofdev/advanced-select-element) **TS**

Fully customizable advanced select element with built-in search and more...

##### [JSON Schema Form Element](https://github.com/lotsofdev/json-schema-form) **TS**

Fully customizable and easy to use element to display form based on the [json-schema](https://json-schema.org/) standard.

#### Tools

##### [Lotsof CLI](https://github.com/lotsofdev/cli) **SH**

Useful CLI that allows you to use all our tools quickly and efficiently.

##### [Factory](https://github.com/lotsofdev/cli) **TS/PHP**

All in one components development UI supporting Blade, Twig, React, Vue, and more...

#### Libraries

##### [I18n](https://github.com/lotsofdev/i18n) **TS**

Simple but complete i18n library for your JS projects. It is used inside our tools like elements, etc...

##### [Sugar](https://github.com/lotsofdev/sugar) **TS/PHP**

Useful toolbox that gives you access to nice functions like:

- `querySelectorLive`: Live version of the `querySelector` function
- `whenInViewport`: Promise based in viewport detection
- `onScrollEnd`: Do something when scroll as reached the end
- And many many many more to discover...

##### [SugarCSS](https://github.com/lotsofdev/sugarcss) **CSS**

[Lightningcss](https://lightningcss.dev/) plugin based on `variables` that gives you a ton of features like:

###### Fine color management:

```css
:root {
  --s-color-accent: #ff0000;
  --s-share-border: --alpha 0.2;
}
h1 {
  color: s-color(accent, --darken 20 --alpha 0.1);
}
h2 {
  color: s-color(accent, border);
}
```

###### Media queries management:

```css
:root {
  --s-media-mobile: 0, 768px;
  --s-media-tablet: 769px, 1024px;
  --s-media-desktop: 1025px;
  --s-media-wide: 1440px;
}
h1 {
  color: red;

  @media desktop {
    color: green;
  }
}
```

And a lot more like: **Font management**, **Spaces management**, **Easing management**, etc...

##### [Types](https://github.com/lotsofdev/types) **TS/PHP**

The `types` package gives you access to a multiple of pre-made data types to be used as base for your own types or as is like:

###### TBody

```ts
export type TBody = {
  suptitle?: string;
  title?: string;
  subtitle?: string;
  lead?: string;
  text?: string;
  buttons?: any[];
  titleLevel?: number;
  subtitleLevel?: number;
  suptitleLevel?: number;
};
```

###### TLink

```ts
export type TLink = {
  href?: string;
  text?: string;
  title?: string;
  target?: '_blank' | '_self';
  class?: string;
  noopener?: boolean;
  noreferrer?: boolean;
  ariaLabel?: string;
};
```

###### TButton

```ts
export type TButton = {
  style?: 'solid' | 'outline' | 'text';
  class?: string;
  link?: __LinkType;
};
```

And a lot more like `TCard`, `THero`, `TImage`, etc...

> All these types are available in **`TS`** as well as in **`PHP`** for convinience.

### Requirements

- Node: `^20.0.0`
- PHP: `^8.0.0`

### Clone

To clone this monorepo, make use of this command:

```sh
git clone --recurse-submodules https://github.com/lotsofdev/monorepo.git
```

This will ensure you have the **submodules** correctly cloned as well.

### Install

To install the repository, simple launch:

```sh
npm i
```

This will install all the dependencies (nodes and php) for all the packages.

### Develop

To develop in this monorepo, you have 2 solutions:

##### Global

You can launch the development process in all the packages at once using this command from the monorepo root directory:

```sh
npm run dev
```

> Note that this will not launch the development process in the packages prefixed by **website-** or **wordpress-**

##### Package by package

You can also if you prefer, launch the same command into any package folder to launch the development process in this specific package only:

```sh
cd packages/sugar && npm run dev
```
