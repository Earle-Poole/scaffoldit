# Scaffoldit

## How to use

For npm:

```
npm run scaffoldit <destination-path> <component-name>
```

For yarn:

```
yarn run scaffoldit <destination-path> <component-name>
```

<br/>

## Examples

```
npm run scaffoldit src\components\atoms Input
```

This command will perform the following:

- Create an `Input` folder within `src/components/atoms`
- Create the following files in the `Input` folder:
  - `index.ts`
  - `Input.tsx`
  - `Input.stories.tsx`
  - `Input.types.ts`

<br/>

## Config File

You can create your own templates and use them with Scaffoldit. To do so, you need to create a `scaffoldit.config.js` file in the root of your project. You can create this file manually, or you can use the `-i, --init` flag to create it for you.

```
npm run scaffoldit --init
// or
npm run scaffoldit -i
```

This is an example of a `scaffoldit.config.js` file:

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

## Custom Templates

During the initialization of the config file, you will be asked if you want to use custom templates. If you choose to do so, you will be asked to provide the `path` to your custom templates. The path should be relative to the root of your project. Next you will be prompted to provide the `templates` you want to use. The templates should be provided in the following format:

```cmd
<template-filename>@<output-extension>
Example:
- Templates to use:
- "component@tsx, story@stories.tsx, tests@test.tsx, types@types.ts"
```

The example above will establish a filename for a template to look for and an output extension mapping in the following way:

- `component.ts`-> `<ComponentName>.tsx`
- `story.ts` -> `<ComponentName>.stories.tsx`
- `tests.ts` -> `<ComponentName>.test.tsx`
- `types.ts` -> `<ComponentName>.types.ts`

## Arguments

| Name/Flag                | Description                                                                | Values                           |
| ------------------------ | -------------------------------------------------------------------------- | -------------------------------- |
| `destination-path`       | <b>First arg:</b> The path where the new component will be created.        | A valid file path.               |
| `component-name`         | <b>Second arg:</b> The name of the component to be created.                | A valid string.                  |
| `-i, --init`             | Initialize a config file.                                                  | `true`, <strong>`false`</strong> |
| `-f, --force`            | Forces overwriting of existing files.                                      | `true`, <strong>`false`</strong> |
| `-nt, --no-tests`        | Exclude tests from the generated files.                                    | `true`, <strong>`false`</strong> |
| `-nts, --no-typescript`  | Exclude TypeScript from the generated files.                               | `true`, <strong>`false`</strong> |
| `-ns, --no-stories`      | Exclude the creation of storybook files.                                   | `true`, <strong>`false`</strong> |
| `-ne, --no-entry`        | Exclude the creation of an `index.ts` file.                                | `true`, <strong>`false`</strong> |
| `-ct, --custom-template` | Use configured custom templates. <strong>Use `-i, --init` first! </strong> | `true`, <strong>`false`</strong> |

## Future Features

- [x] Support custom templates
- [ ] Support for CSS
- [x] Support config file creation & usage
- [x] Support custom file extensions
- [ ] Add support for custom file names
- [ ] Automated detection of newly added templates
