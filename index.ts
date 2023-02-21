#!/usr/bin/env node

console.log('Loading scaffolding...')
import fs from "fs"
import entry from "./templates/entry.ts"
import component from "./templates/component.ts"
import types from "./templates/types.ts"
import { conditionallyWriteFile, parseArgsForOptions } from "./utils.ts"
import story from "./templates/story.ts"
import tests from "./templates/tests.ts"

const [destination, componentName, ...restArgs] = process.argv.slice(2)

const formattedDestination = destination.replace(/\\/g, "/")
const formattedComponentName =
  componentName[0].toUpperCase() + componentName.slice(1)

// const isTemplate =
//   formattedDestination.includes("/templates") &&
//   formattedComponentName.endsWith("Template")
const options = parseArgsForOptions(restArgs)
export const useTypescript = !options.noTypescript

const rootPath = `${formattedDestination}/${formattedComponentName}`
const extensions = {
  jsx: useTypescript ? "tsx" : "jsx",
  js: useTypescript ? "ts" : "js",
}

const main = async () => {
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true })
  }

  if (options.init) {
    console.log('Initializing scaffolding config...')

    process.exit()
  }

  if (!options.noEntry) {
    const entryFilePath = `${rootPath}/index.${extensions.js}`
    await conditionallyWriteFile(
      entryFilePath,
      entry(formattedComponentName),
      options.forceOverwrite
    )
  }

  const componentFilePath = `${rootPath}/${formattedComponentName}.${extensions.jsx}`
  await conditionallyWriteFile(
    componentFilePath,
    component(formattedComponentName),
    options.forceOverwrite
  )

  if (!options.noTypescript) {
    const typesFilePath = `${rootPath}/${formattedComponentName}.types.${extensions.js}`
    await conditionallyWriteFile(
      typesFilePath,
      types(formattedComponentName),
      options.forceOverwrite
    )
  }

  if (!options.noStories) {
    const storyFilePath = `${rootPath}/${formattedComponentName}.stories.${extensions.jsx}`
    await conditionallyWriteFile(
      storyFilePath,
      story(formattedDestination, formattedComponentName),
      options.forceOverwrite
    )
  }

  if (!options.noTests) {
    const testsFilePath = `${rootPath}/${formattedComponentName}.test.${extensions.jsx}`
    await conditionallyWriteFile(
      testsFilePath,
      tests(formattedComponentName),
      options.forceOverwrite
    )
  }

  process.exit()
}

main()
