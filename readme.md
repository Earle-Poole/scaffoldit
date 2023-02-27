# <!-- insert name here -->

## How to use

For npm:

```
npm run scaffold <destination-path> <component-name>
```

For yarn:

```
yarn run scaffold <destination-path> <component-name>
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

<br>

## Arguments

| Name/Flag                | Description                                                                | Values                           |
| ------------------------ | -------------------------------------------------------------------------- | -------------------------------- |
| `destination-path`       | <b>First arg:</b> The path where the new component will be created.        | A valid file path.               |
| `component-name`         | <b>Second arg:</b> The name of the component to be created.                | A valid string.                  |
| `-f, --force`            | Forces overwriting of existing files.                                      | `true`, <strong>`false`</strong> |
| `-nt, --no-tests`        | Exclude tests from the generated files.                                    | `true`, <strong>`false`</strong> |
| `-nts, --no-typescript`  | Exclude TypeScript from the generated files.                               | `true`, <strong>`false`</strong> |
| `-ns, --no-stories`      | Exclude the creation of storybook files.                                   | `true`, <strong>`false`</strong> |
| `-ne, --no-entry`        | Exclude the creation of an `index.ts` file.                                | `true`, <strong>`false`</strong> |
| `-i, --init`             | Initialize a config file.                                                  | `true`, <strong>`false`</strong> |
| `-ct, --custom-template` | Use configured custom templates. <strong>Use `-i, --init` first! </strong> | `true`, <strong>`false`</strong> |

## Future Features

- [ ] Support custom templates
- [ ] Support for CSS
- [ ] Support config file creation & usage
- [ ] Support custom file extensions
- [ ] Add support for custom file names
- [ ] Automated detection of newly added templates
