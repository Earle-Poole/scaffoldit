import config, { Options } from "../templates/config"
import {
  conditionallyWriteFile,
  promptUserForBoolean,
  promptUserForCustomTemplates,
} from "./interactions"

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

  // Iterate through each option and prompt the user to enable or disable it
  const optionsKeyArray = Object.keys(options) as Options[]
  for (let i = 0; i < optionsKeyArray.length; i++) {
    const option = optionsKeyArray[i]
    const query = `Would you like to enable the ${option} option? (y/N)  `
    const flag = await promptUserForBoolean(query, false)
    // If the option is not the `init` option, update the `options` object with the user's response
    if (option !== Options.init) {
      options[option] = flag
    }
  }

  // Prompt the user for custom template information and update the `customTemplatesConfig` object accordingly
  await promptUserForCustomTemplates(customTemplatesConfig)

  console.log("customTemplatesConfig: ", customTemplatesConfig)

  // Write the scaffoldit configuration to disk
  const configFileName = "scaffoldit.config.ts"
  await conditionallyWriteFile(
    configFileName,
    config({ ...options, customTemplates: customTemplatesConfig }),
    options.forceOverwrite
  )

  // Exit the process
  process.exit()
}
