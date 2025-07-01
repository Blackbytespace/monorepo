# Blackbyte Factory

The factory is a UI that allows you to create, display and tests your [components](https://github.com/blackbytespace/monorepo/tree/main/packages/components).

---

- [Blackbyte Factory](#blackbyte-factory)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Install](#install)
  - [Usage](#usage)
  - [Contribute](#contribute)

---

## Features

The factory currently support these features:

- List components
- Render a component using one of these engines:
  - [Blade](https://laravel.com/docs/11.x/blade)
  - [Twig](https://twig.symfony.com/)
  - [React](https://react.dev/)
  - [Vue](https://vuejs.org/)
- Play with your component attributes described using [json-schema](https://json-schema.org/)
- Save and load `presets` for each components
- Resize viewport using media queries
- Hotkeys for quick and efficient navigation
- Command panel (like vscode) as navigation option
- And more...

---

## Requirements

This package works in conjuction with the [components](https://github.com/blackbytespace/monorepo/tree/main/packages/components) workflow. Make sure to check this out before.

- PHP: `^8.0.0`
- Node: `20.0.0`

## Install

To install the factory in your project, simply use this command:

```shell
npm i @blackbyte/factory
```

---

## Usage

To start the factory, simple use this command:

```shell
blackbyte factory.start
```

> Note that this package make uses of the [Blackbyte CLI](https://github.com/blackbytespace/monorepo/tree/main/packages/cli). Please make sure to install it before.

Then you have to start your project development process.

For now the Factory will load these 2 url's:

- `http://localhost/src/js/index.ts`
- `http://localhost/src/css/index.css`

> This will be updated to enable custom assets to load as well in the futur.

You can then just go to **[http://0.0.0.0:3000](http://0.0.0.0:3000)** to access the Factory UI.

---

## Contribute

To contribute to this package, please [follow these guidelines](https://github.com/blackbytespace/monorepo/blob/main/CONTRIBUTE.md).

Everyone is welcome as long as they respect our [code of conduct](https://github.com/blackbytespace/monorepo/blob/main/CODEOFCONDUCT.md).
