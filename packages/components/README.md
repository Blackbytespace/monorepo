# Components

The goal of this package is to gives you access to a nive and convinient way to manage components that you may use across multiple projects.

A component in our vision is a folder that gives you access to 1 feature. It can be UI components like **buttons**, **card**, **hero**, but also things like **api facade**, **settings facade**, etc... and that can be added into you project through our [blackbyte CLI](https://github.com/blackbytespace/monorepo/tree/main/packages/cli).

> Some official components are availble but you can, and you should, create your own as well!

We can describe **components** as **npm packages** or **composer packages** with the difference that you will install them in your project and modify then as you want after that as they become part of your codebase (usually stored in `src/components` folder).

> You can see this more as a good starting point and backbone for your components to **make easier to reuse them across projects**.

- [Components](#components)
  - [Install](#install)
  - [Principles](#principles)
  - [Guidelines](#guidelines)
  - [Loaders](#loaders) - [`index.css`](#indexcss) - [`index.php`](#indexphp) - [`index.ts`](#indexts)
  - [Component.json](#componentjson)
    - [Dependencies](#dependencies)
    - [Subset](#subset)
  - [CLI](#cli)
    - [List available components](#list-available-components)
    - [Add a component into our project](#add-a-component-into-our-project)
    - [Updating the "libraries"](#updating-the-libraries)
  - [Contribute](#contribute)

---

## Install

Basically, you don't have to install this package. It will come with the `@blackbyte/cli` one.

**BUT...**

If you have a package on your side that describe a `library`, you will have to install it to have access to this library components.

This documentation will come later. For now you can make use of our officials components through the `blackbyte` CLI.

## Principles

Components are base pieces of our web development workflow. A component can be different things like:

- A slider
- An API facade like retrieving posts from X, instagram, etc...
- A render engine facade like `Blade`, `Twig`, etc...
- A card UI element
- Etc...

> Note that this approach can be used in every frameworks like **Next**, **Nuxt**, and more...

The goal of this `components` based pattern is to allow a coherent and simple pattern to store them. Usually (but it's up to you), we will store all of our components inside the `src/components/` directory.

**1 folder = 1 component = 1 purpose**

Each component is stored in his own folder like:

- `src/components/slider`
- `src/components/instagram`
- `src/components/renderEngine`
- etc...

These components can have different files in them, but some [guidelines](#guidelines) describe a good start. Here's what it can be:

```shell
| slider
| ----- component.json # a file used to describe your component, version, etc...
| ----- slider.component.php  # entrypoint of your component
| ----- slider.mock.php # a file that returns some "mock" data to test purposes
| ----- slider.ts # some logic for your slider
| ----- slider.bare.css # the functional css of your slider (minimal for the slider to work)
| ----- slider.css #the visual part of your css. Make it pretty!
| ----- slider.blade.php # a blade template to render your component
| ----- slider.schema.json # describe the data your slider accepts using json-schema
| ----- etc...
```

---

## Guidelines

Here's some guidelines to name your component files and make them as similar as possible across them:

- `component.json`
  - File that describe the component.
  - See more in the [component.json](#component-json) section.
- `%componentName.component.php`
  - PHP entrypoint to load your component.
  - This file **MUST NOT** print anything. His goal is to load dependencies of your component and expose things (classes, functions, etc...) (usually in the `\Components\%ComponentName`) namespace.
  - Allows you to make a custom loader for all yout components like so:
- `%componentName.mock.php`
  - File that returns some fake (mock) data for UI components testing.
  - **MUST** return an (associative) array.
- `%componentName.mock.ts`
  - File that export as default a function that returns some mock data for UI testing.
  - See more in the [mocks](#mocks) section.
- `%componentName.schema.json`
  - File that describe data structure/types for UI components.
  - See [json-schema.org](https://json-schema.org/) for more info.
- `%componentName.ts`
  - TS entrypoint to load your component.
- `%componentName.blade.php`
  - Blade template.
- `%componentName.twig`
  - Twig template.
- `%componentName.tsx`
  - React component.
- `%componentName.vue`
  - Vue component.
- And any other files that you may need

---

## Loaders

As a good practice, we create these files into the `src/components` directory that have the responsability to load/import the components files (css, php, etc...)

Here`s an example of each of them:

##### `index.css`

```css
@import './settings/settings.css';

@import './card/card.css';
@import './slider/slider.css';
/* etc... */
```

##### `index.php`

```php
<?php

# Load all the files that ends with component.php or type.php.
# These files does not have to print anything.
$files = glob(__DIR__ . '/**/*.{component,type}.php', GLOB_BRACE);
foreach ($files as $file) {
    require_once $file;
}
```

##### `index.ts`

```ts
import './slider/slider';
// etc...
```

These files then have to be loaded depending on your framework, project structure, etc...
It's all up to you!

---

## Component.json

The `component.json` file at the root of each components is here to describe what is this component, which files has to be collected when installing it, etc...

Here's an exemple of a `component.json` file:

```json
{
  "version": "1.0.0",
  "name": "slider",
  "description": "Simple slider component",
  "files": ["*.php", "*.ts", "*.css"]
}
```

#### Dependencies

Each component can have some dependencies like `npm` or `composer` packages.

Here's how to specify them:

```json
{
  "version": "1.0.0",
  "name": "slider",
  "description": "Simple slider component",
  "files": ["*.php", "*.ts", "*.css"],
  "packageJson": {
    "dependencies": {
      "@blackbyte/types": "^1.0"
    }
  },
  "composerJson": {
    "require": {
      "blackbyte/types": "^1.0"
    }
  }
}
```

This will make the CLI add the `@blackbyte/types` package in the `package.json` file as well as the `blackbyte/types` package in your `composer.json` file.

#### Subset

Each component can also been `splitted` into smaller one at install step.

With that principle you can have one component folder to maintain and make it available for different `engine` for example like **React**, **Vue**, **Blade**, etc...

When this component will be added through the CLI, a question will be asked to the user to specify which `engines` he's interested in.

Here's how to specify them:

```json
{
  "version": "1.0.0",
  "name": "slider",
  "description": "Simple slider component",
  "files": []"*.css"],
  "subset": {
    "engine": {
      "question": "Which engine do you use?",
      "type": "checkbox",
      "choices": ["blade", "twig", "tsx"],
      "component": {
        "twig": {
          "files": ["*.twig", "slider.type.php", "slider.component.php"]
        },
        "blade": {
          "files": ["*.blade.php", "slider.type.php", "slider.component.php"]
        },
        "tsx": {
          "files": ["*.tsx", "slider.type.ts", "slider.component.ts"],
          "packageJson": {
            "dependencies": {
              "react": "^18.0.0"
            }
          }
        }
      }
    }
  },
  "packageJson": {
    "dependencies": {
      "@blackbyte/types": "^1.0"
    }
  },
  "composerJson": {
    "require": {
      "blackbyte/types": "^1.0"
    }
  }
}
```

The files added will be the result of all the `files` arrays choosed by the user with ovbiously the `files` property at the root of our json.

---

## CLI

### List available components

To list the available components, simply use this command:

```shell
blackbyte components.ls
```

### Add a component into our project

To add a component into our project, simply use this command:

```shell
blackbyte components.add @blackbyte/body
```

### Updating the "libraries"

Libraries are like "sources" where to get components from.

Built-in libraries are:

- `@blackbyte/components`: Main blackbyte components library

It's possible to add you own library but documentation will come later as the project is still in `alpha`.

To update your libraries localy, simple use this command:

```shell
blackbyte components.update
```

> Note that this does not update components in your projects, but it updates the libraries cached on your disk for futur installs.

---

## Contribute

To contribute to this package, please [follow these guidelines](https://github.com/blackbytespace/monorepo/blob/main/CONTRIBUTE.md).

Everyone is welcome as long as they respect our [code of conduct](https://github.com/blackbytespace/monorepo/blob/main/CODEOFCONDUCT.md).
