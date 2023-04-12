import path from "path"
import config, { Options } from "../templates/config.js"
import {
  conditionallyWriteFile,
  promptUserForBoolean,
  promptUserForCustomTemplates,
} from "./interactions.js"

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
  const configFileName = "scaffoldit.config.js"
  await conditionallyWriteFile(
    path.resolve(__dirname, configFileName),
    config({ ...options, customTemplates: customTemplatesConfig }),
    options.forceOverwrite
  )

  process.exit()
}
