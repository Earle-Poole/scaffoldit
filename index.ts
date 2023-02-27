#!/usr/bin/env node

console.log("Loading scaffoldit...")

import fs from "fs"
import entry from "./templates/entry.ts"
import component from "./templates/component.ts"
import types from "./templates/types.ts"
import { parseArgsForOptions } from "./utils/index.ts"
import story from "./templates/story.ts"
import tests from "./templates/tests.ts"
import scaffolditConfig from "./scaffoldit.config.ts"
import { conditionallyWriteFile } from "./utils/interactions.ts"
import { init } from "./utils/template-fns.ts"

// Parse command-line arguments and scaffoldit configuration to determine options and component information
const nodeArgs = process.argv.slice(2)
const [destination, componentName] = nodeArgs
const { customTemplates: customTemplatesConfig, ...configObj } =
  scaffolditConfig
const options = { ...configObj, ...parseArgsForOptions(nodeArgs) }

// Format the component destination and name, and determine whether TypeScript is being used
const formattedDestination = destination.replace(/\\/g, "/")
const formattedComponentName = componentName
  ? componentName[0].toUpperCase() + componentName.slice(1)
  : ""
export const useTypescript = !options.noTypescript

// Define the root path for the component and the file extensions to use for the component, based on whether TypeScript is being used
const rootPath = `${formattedDestination}/${formattedComponentName}`
const extensions = {
  jsx: useTypescript ? "tsx" : "jsx",
  js: useTypescript ? "ts" : "js",
}

const main = async () => {
  // If the `init` option is set, remove it from the options object before callling the `init` function
  if (options.init) {
    delete options.init
    await init(options, customTemplatesConfig)
  }

  // If the rootPath directory doesn't exist, create it
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true })
  }

  // If the `noEntry` option is not set, write the component entry file to the rootPath directory
  if (!options.noEntry) {
    const entryFilePath = `${rootPath}/index.${extensions.js}`
    await conditionallyWriteFile(
      entryFilePath,
      entry(formattedComponentName),
      options.forceOverwrite
    )
  }

  // Write the main component file to the rootPath directory
  const componentFilePath = `${rootPath}/${formattedComponentName}.${extensions.jsx}`
  await conditionallyWriteFile(
    componentFilePath,
    component(formattedComponentName),
    options.forceOverwrite
  )

  // If the `noTypescript` option is not set, write the TypeScript types file to the rootPath directory
  if (!options.noTypescript) {
    const typesFilePath = `${rootPath}/${formattedComponentName}.types.${extensions.js}`
    await conditionallyWriteFile(
      typesFilePath,
      types(formattedComponentName),
      options.forceOverwrite
    )
  }

  // If the `noStories` option is not set, write the component story file to the rootPath directory
  if (!options.noStories) {
    const storyFilePath = `${rootPath}/${formattedComponentName}.stories.${extensions.jsx}`
    await conditionallyWriteFile(
      storyFilePath,
      story(formattedDestination, formattedComponentName),
      options.forceOverwrite
    )
  }

  // If the `noTests` option is not set, write the component test file to the rootPath directory
  if (!options.noTests) {
    const testsFilePath = `${rootPath}/${formattedComponentName}.test.${extensions.jsx}`
    await conditionallyWriteFile(
      testsFilePath,
      tests(formattedComponentName),
      options.forceOverwrite
    )
  }

  // Exit the process
  process.exit()
}

main()
