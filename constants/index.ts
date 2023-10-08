#!/usr/bin/env bun
import DEFAULT_CONFIG from "../scaffoldit.config.js"
import { fileURLToPath, pathToFileURL } from "bun"
import { parseArgsForOptions } from "../utils"
import { CustomTemplatesConfig } from "../types"

const __filename = fileURLToPath(new URL(import.meta.url))
const __dirname = pathToFileURL(__filename.split("/").slice(0, -1).join("/"))
export const defaultConfigFilePath = pathToFileURL(
  __dirname + "/scaffoldit.config.js"
)
export const appConfigFilePath = pathToFileURL(
  process.cwd() + "/scaffoldit.config.js"
)

export const scaffolditConfigFilePath = Bun.file(appConfigFilePath)
  ? appConfigFilePath
  : defaultConfigFilePath

const scaffolditConfig: typeof DEFAULT_CONFIG = (await Bun.file(
  scaffolditConfigFilePath
).exists())
  ? (await import(scaffolditConfigFilePath.pathname)).default
  : DEFAULT_CONFIG

// Parse command-line arguments and scaffoldit configuration to determine options and component information
const nodeArgs = process.argv.slice(2)
const [destination, componentName] = nodeArgs
export const customTemplatesConfig = scaffolditConfig.customTemplates
const { customTemplates, ...configObj } = scaffolditConfig
export const options = { ...configObj, ...parseArgsForOptions(nodeArgs) }
export const isInitializingConfig = options.init

if (!destination && !isInitializingConfig) {
  console.log(
    'Please specify a destination for the component. e.g. "yarn run scaffoldit <destination> <componentName>"'
  )
  process.exit(9)
}

if (!componentName && !isInitializingConfig) {
  console.log(
    'Please specify a name for the component. e.g. "yarn run scaffoldit <destination> <componentName>"'
  )
  process.exit(9)
}

export const formattedDestination = destination.replace(/\\/g, "/")
export const formattedComponentName = componentName
  ? componentName[0].toUpperCase() + componentName.slice(1)
  : ""
export const useTypescript = !options.noTypescript

export const extensions = {
  jsx: useTypescript ? "tsx" : "jsx",
  js: useTypescript ? "ts" : "js",
}

export const PATHS = {
  getRoot: () => `${formattedDestination}/${formattedComponentName}`,
  getComponent: function () {
    return `${this.getRoot()}/${formattedComponentName}.${extensions.jsx}`
  },
  getEntry: function () {
    return `${this.getRoot()}/index.${extensions.js}`
  },
  getTypes: function () {
    return `${this.getRoot()}/${formattedComponentName}.types.ts`
  },
  getStory: function () {
    return `${this.getRoot()}/${formattedComponentName}.stories.${
      extensions.jsx
    }`
  },
  getTests: function () {
    return `${this.getRoot()}/${formattedComponentName}.test.${extensions.jsx}`
  },
}

export const defaultCustomTemplateConfig: CustomTemplatesConfig = {
  enabled: false,
  path: "",
  templates: [],
  defaultTemplatesEnabled: true,
}
