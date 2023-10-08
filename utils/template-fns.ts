import path from "path"
import { Options } from "./index.ts"
import {
  conditionallyWriteFile,
  promptUserForBoolean,
  promptUserForCustomTemplates,
} from "./interactions.ts"
import config from "../templates/config.ts"
import {
  PATHS,
  appConfigFilePath,
  formattedComponentName,
  formattedDestination,
  options,
} from "../constants/index.ts"
import component from "../templates/component.ts"
import entry from "../templates/entry.ts"
import types from "../templates/types.ts"
import story from "../templates/story.ts"
import tests from "../templates/tests.ts"

// A function that initializes the scaffoldit configuration based on user input
export const init = async (
  options: Omit<Record<Options, boolean>, "init">,
  customTemplatesConfig: {
    enabled: boolean
    path: string
    templates: any[]
    defaultTemplatesEnabled: boolean
  }
) => {
  console.log("Initializing scaffoldit config...")

  const optionsKeyArray = Object.keys(options) as Options[]
  console.log("optionsKeyArray: ", optionsKeyArray)
  for (let i = 0; i < optionsKeyArray.length; i++) {
    const option = optionsKeyArray[i]
    const query = `Would you like to enable the ${option} option? (y/N)  `
    const flag = await promptUserForBoolean(query, false)
    // Skip the init Option
    if (option !== Options.init) {
      options[option] = flag
    }
  }

  // Prompt the user for custom template information and update the `customTemplatesConfig` object accordingly
  await promptUserForCustomTemplates(customTemplatesConfig)

  console.log("customTemplatesConfig: ", customTemplatesConfig)

  // Write the scaffoldit configuration to disk
  await conditionallyWriteFile(
    appConfigFilePath.href,
    config({ ...options, customTemplates: customTemplatesConfig }),
    options.forceOverwrite
  )

  process.exit()
}

export const writeDefaultTemplateFiles = async () => {
  // Write the main component file to the rootPath directory
  await conditionallyWriteFile(
    PATHS.getComponent(),
    component(formattedComponentName),
    options.forceOverwrite
  )

  // If the `noEntry` option is not set, write the component entry file to the rootPath directory
  if (!options.noEntry) {
    await conditionallyWriteFile(
      PATHS.getEntry(),
      entry(formattedComponentName),
      options.forceOverwrite
    )
  }

  // If the `noTypescript` option is not set, write the TypeScript types file to the rootPath directory
  if (!options.noTypescript) {
    await conditionallyWriteFile(
      PATHS.getTypes(),
      types(formattedComponentName),
      options.forceOverwrite
    )
  }

  // If the `noStories` option is not set, write the component story file to the rootPath directory
  if (!options.noStories) {
    await conditionallyWriteFile(
      PATHS.getStory(),
      story(formattedComponentName, formattedDestination),
      options.forceOverwrite
    )
  }

  // If the `noTests` option is not set, write the component test file to the rootPath directory
  if (!options.noTests) {
    await conditionallyWriteFile(
      PATHS.getTests(),
      tests(formattedComponentName),
      options.forceOverwrite
    )
  }
}
