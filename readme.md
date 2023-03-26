# Scaffoldit

## How to use

### Installation

Install the package globally ...

```cmd
$ npm install -g @earle-poole/scaffoldit

# or

$ yarn global add @earle-poole/scaffoldit
```

... or install it locally and add its run script to your `package.json` file.

```cmd
$ npm install @earle-poole/scaffoldit

# or

$ yarn add @earle-poole/scaffoldit
```

### Usage

Global installation

```cmd
$ scaffoldit <destination-path> <component-name> [options]
```

Local installation, `scaffoldit` script added to `package.json`

```cmd
$ npm run scaffoldit <destination-path> <component-name> [options]
```

<br/>

## Examples

```
$ npm run scaffoldit src\components\atoms Input
```

This command will create the following file structure:

```
src/
└── components/
    └── atoms/
        └── Input/
            ├── index.ts
            ├── Input.stories.tsx
            ├── Input.tsx
            ├── Input.test.tsx
            └── Input.types.ts
```

<br/>

## Config File

You can create your own templates and use them with Scaffoldit. To do so, you need to create a `scaffoldit.config.mjs` file in the root of your project. You can create this file manually, or you can use the `-i, --init` flag to create it for you.

```
$ npm run scaffoldit --init

# or

$ npm run scaffoldit -i
```

This is an example of a `scaffoldit.config.mjs` file:

```js
export default {
  forceOverwrite: false, // Force accept all overwrite prompts
  noEntry: false, // Exclude creation of default `index` file
  noStories: false, // Exclude creation of default `stories` file
  noTests: false, // Exclude creation of default `test` file
  noTypescript: false, // Exclude creation of default `types` file
  customTemplates: {
    enabled: false, // Enable custom templates
    path: "", // Path to custom templates
    templates: [], // Custom templates filenames with output extension
    defaultTemplatesEnabled: true, // Enable default templates
  },
}
```

## Default Templates

When running Scaffoldit without a config file, it will use the default templates. These templates are located in the `templates` folder of the package. The default templates are as follows:

- `component.ts` -> `<ComponentName>.tsx`
- `story.ts` -> `<ComponentName>.stories.tsx`
- `tests.ts` -> `<ComponentName>.test.tsx`
- `types.ts` -> `<ComponentName>.types.ts`
- `entry.ts` -> `index.ts`

Default templates will be used until they are explicitly disabled when enabling custom templates.

## Making a Custom Template

To make a custom template, you need to create a `.mjs` file in the `templates` folder of your project. The filename of the template should be the same as the name of the template you want to use. For example, if you want to use a custom template for the `component` template, you need to create a file named `component.mjs` in the `templates` folder.

The template file should export a function that returns a template literal. The function will receive the provided `component-name` as an argument. The template literal should contain the template for the file you want to create.

Example template file:

```js
export default (componentName) => `export const ${componentName} = () => {
    return <div>${componentName}</div>;
  };
`
```

## Using Custom Templates

During the initialization of the config file, you will be asked if you want to use custom templates. If you choose to do so, you will be asked to provide the `path` to your custom templates. The path should be relative to the root of your project. Next you will be prompted to provide the `templates` you want to use. The templates should be provided in the following format:

```txt
<template-filename>@<output-extension>
```

Example prompt during `init` process:

```cmd
$ Templates to use:
$ component@tsx, story@stories.tsx, tests@test.tsx, types@types.ts
```

The example above will establish a filename for a template to look for and an output extension mapping in the following way:

- `component.mjs` -> `<ComponentName>.tsx`
- `story.mjs` -> `<ComponentName>.stories.tsx`
- `tests.mjs` -> `<ComponentName>.test.tsx`
- `types.mjs` -> `<ComponentName>.types.ts`

_**Note:** If your custom templates are named identically to the default templates, they will override the default templates, if default templates are enabled._

## Arguments

| Name/Flag               | Description                                                         | Values              |
| ----------------------- | ------------------------------------------------------------------- | ------------------- |
| `destination-path`      | <b>First arg:</b> The path where the new component will be created. | A valid file path.  |
| `component-name`        | <b>Second arg:</b> The name of the component to be created.         | A valid string.     |
| `-i, --init`            | Initialize a config file.                                           | `true`, **`false`** |
| `-f, --force`           | Forces overwriting of existing files.                               | `true`, **`false`** |
| `-nt, --no-tests`       | Exclude tests from the generated files.                             | `true`, **`false`** |
| `-nts, --no-typescript` | Exclude TypeScript from the generated files.                        | `true`, **`false`** |
| `-ns, --no-stories`     | Exclude the creation of storybook files.                            | `true`, **`false`** |
| `-ne, --no-entry`       | Exclude the creation of an `index.ts` file.                         | `true`, **`false`** |

## Future Features

- [x] ~~Support custom templates~~
- [x] ~~Support config file creation & usage~~
- [x] ~~Support custom file extensions~~
- [ ] Support for CSS-in-JS libraries
  - [ ] CSS Modules
  - [ ] Styled Components
  - [ ] Emotion
- [ ] Add support for custom file names
- [ ] Automated detection of newly added templates
