# `blackbyte` CLI

The `blackbyte` cli allows you to access all the packages exposed command line utilities like:

- `@blackbyte/factory`
  - `blackbyte factory.start`: Start the blackbyte factory UI
- `@blackbyte/components`
  - `blackbyte components.add ...`: Add a component from any registered components libraries [see @blackbyte/components package](https://github.com/blackbytespace/monorepo/tree/main/packages/components) for more info.
- And more to come...

---

- [`blackbyte` CLI](#blackbyte-cli)
  - [Install](#install)
  - [Features](#features)
  - [Contribute](#contribute)

---

## Install

To install, simply use this command:

```sh
npm i @blackbyte/cli -g
```

Make sure it worked by launching this command:

```
blackbyte
```

You should see the CLI documentation.

---

## Features

The features provided by the CLI depends on the `blackbyte` packages you have in your current project.

Each packages will describe their own command line tools as well as you can access it using `blackbyte --help` generic command to see what you have access in your current directory.

---

## Contribute

To contribute to this package, please [follow these guidelines](https://github.com/blackbytespace/monorepo/blob/main/CONTRIBUTE.md).

Everyone is welcome as long as they respect our [code of conduct](https://github.com/blackbytespace/monorepo/blob/main/CODEOFCONDUCT.md).
