#! /usr/bin/env node

console.log("Loading scaffoldit...")

import fs from "fs"
import entry from "./templates/entry.js"
import component from "./templates/component.js"
import types from "./templates/types.js"
import { parseArgsForOptions } from "./utils/index.js"
import story from "./templates/story.js"
import tests from "./templates/tests.js"
import DEFAULT_CONFIG from "./scaffoldit.config.js"
import { conditionallyWriteFile } from "./utils/interactions.js"
import { init } from "./utils/template-fns.js"
import path from "path"
import { ScaffolditConfig } from "./scaffoldit.config.js"

const scaffolditConfigFilePath = path.resolve(
  process.cwd(),
  "scaffoldit.config.js"
)
const scaffolditConfigFilePathURL = new URL(
  `file://${scaffolditConfigFilePath}`
).href
const scaffolditConfig: ScaffolditConfig = fs.existsSync(
  scaffolditConfigFilePath
)
  ? (await import(scaffolditConfigFilePathURL)).default
  : DEFAULT_CONFIG

// Parse command-line arguments and scaffoldit configuration to determine options and component information
const nodeArgs = process.argv.slice(2)
const [destination, componentName] = nodeArgs
const { customTemplates: customTemplatesConfig, ...configObj } =
  scaffolditConfig
const options = { ...configObj, ...parseArgsForOptions(nodeArgs) }

if (!destination) {
  console.log(
    'Please specify a destination for the component. e.g. "yarn run scaffoldit <destination> <componentName>"'
  )
  process.exit(9)
}

// Format the component destination and name, and determine whether TypeScript is being used
const formattedDestination = destination.replace(/\\/g, "/")
const formattedComponentName = componentName
  ? componentName[0].toUpperCase() + componentName.slice(1)
  : ""

// Define the root path for the component and the file extensions to use for the component, based on whether TypeScript is being used
const rootPath = `${formattedDestination}/${formattedComponentName}`

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

  if (customTemplatesConfig.defaultTemplatesEnabled) {
    // Write the main component file to the rootPath directory
    const componentFilePath = `${rootPath}/${formattedComponentName}.${extensions.jsx}`
    await conditionallyWriteFile(
      componentFilePath,
      component(formattedComponentName),
      options.forceOverwrite
    )

    // If the `noEntry` option is not set, write the component entry file to the rootPath directory
    if (!options.noEntry) {
      const entryFilePath = `${rootPath}/index.${extensions.js}`
      await conditionallyWriteFile(
        entryFilePath,
        entry(formattedComponentName),
        options.forceOverwrite
      )
    }

    // If the `noTypescript` option is not set, write the TypeScript types file to the rootPath directory
    if (!options.noTypescript) {
      const typesFilePath = `${rootPath}/${formattedComponentName}.types.ts`
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
        story(formattedComponentName, formattedDestination),
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
  }

  if (customTemplatesConfig.enabled) {
    if (!fs.existsSync(customTemplatesConfig.path)) {
      console.log(
        "Custom templates directory does not exist. Please run `scaffoldit init` to reconfigure the directory path."
      )
      process.exit()
    }

    console.log(
      "customTemplatesConfig.templates: ",
      customTemplatesConfig.templates
    )
    const templateDirectoryPath = `${process.cwd()}/${
      customTemplatesConfig.path
    }`
    // If the `customTemplates` option is enabled, import the custom templates
    const importedCustomTemplatesResponse = await Promise.all(
      customTemplatesConfig.templates.map((template) => {
        const templateFileName = `${template[0]}.mjs`
        const templateFilePath = path.resolve(
          templateDirectoryPath,
          templateFileName
        )

        const templateFilePathURL = new URL(`file://${templateFilePath}`).href

        return import(templateFilePathURL)
      })
    )

    // Write the custom templates to the rootPath directory
    const responseFromWritingCustomTemplates = await Promise.all(
      importedCustomTemplatesResponse.map((customTemplate, idx) => {
        const templateFileExtension = customTemplatesConfig.templates[idx][1]
        const templateFilePath = `${rootPath}/${formattedComponentName}.${templateFileExtension}`
        return conditionallyWriteFile(
          templateFilePath,
          customTemplate.default(formattedComponentName),
          options.forceOverwrite
        )
      })
    )

    console.log(
      "responseFromWritingCustomTemplates: ",
      responseFromWritingCustomTemplates
    )
  }

  process.exit(0)
}

export const useTypescript = !options.noTypescript

export const extensions = {
  jsx: useTypescript ? "tsx" : "jsx",
  js: useTypescript ? "ts" : "js",
}

main()
