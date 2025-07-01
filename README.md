# Blackbyte monorepo

Welcome in the Blackbyte monorepo.

## Glossary

1. [Packages](#packages)
2. [Requirements](#requirements)
3. [Clone repository](#clone)
4. [Install](#install)
5. [Develop](#develop)
6. [Contribute](#contribute)

## Packages

Here you can get access to all the packages developed by our team. Things like:

#### Custom Elements

##### [Lit Element](https://github.com/blackbytespace/monorepo/tree/main/packages/litElement)

Base class on top of the wonderful [Lit](https://lit.dev) library that add some features like `mountWhen`, etc...

#### Tools

##### [Sugar](https://github.com/blackbytespace/monorepo/tree/main/packages/sugar) **TS/PHP**

Useful toolbox that gives you access to nice functions like:

- `querySelectorLive`: Live version of the `querySelector` function
- `whenInViewport`: Promise based in viewport detection
- `onScrollEnd`: Do something when scroll as reached the end
- And many many many more to discover...

##### [SugarCSS](https://github.com/blackbytespace/monorepo/tree/main/packages/sugarcss) **CSS**

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
  --s-media-xs: 0 474px;
  --s-media-sm: 475 639px;
  --s-media-md: 640px 767px;
  --s-media-lg: 768px 1023px;
  --s-media-xl: 1024px 1279px;
  --s-media-xxl: 1280px;
}
h1 {
  color: red;

  @media md {
    color: green;
  }
}
```

And a lot more like: **Font management**, **Spaces management**, **Easing management**, etc...

### Requirements

- Node: `^20.0.0`
- PHP: `^8.0.0`

### Clone

To clone this monorepo, make use of this command:

```sh
git clone https://github.com/blackbytespace/monorepo.git
```

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

### Contribute

To contribute, follow [these guidelines](CONTRIBUTE.md).

> This project is meant to be open. In that regard, everyone is welcome to contribute to it. The only requirement is that you follow our [code of conduct](CODEOFCONDUCT.md)
