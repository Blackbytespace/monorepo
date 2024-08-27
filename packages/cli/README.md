# `lotsof` CLI

The `lotsof` cli allows you to access all the packages exposed command line utilities like:

- `@lotsof/factory`
  - `lotsof factory.start`: Start the lotsof factory UI
- `@lotsof/components`
  - `lotsof components.add ...`: Add a component from any registered components libraries [see @lotsof/components package](https://github.com/lotsofdev/monorepo/tree/master/packages/components) for more info.
- And more to come...

---

- [`lotsof` CLI](#lotsof-cli)
  - [Install](#install)
  - [Contribute](#contribute)

---

## Install

To install, simply use this command:

```sh
npm i @lotsof/cli -g
```

Make sure it worked by launching this command:

```
lotsof
```

You should see the CLI documentation.

---

## Features

The features provided by the CLI depends on the `lotsof` packages you have in your current project.

Each packages will describe their own command line tools as well as you can access it using `lotsof --help` generic command to see what you have access in your current directory.

---

## Contribute

To contribute to this package, please [follow these guidelines](https://github.com/lotsofdev/monorepo/blob/master/CONTRIBUTE.md).

Everyone is welcome as long as they respect our [code of conduct](https://github.com/lotsofdev/monorepo/blob/master/CODEOFCONDUCT.md).
