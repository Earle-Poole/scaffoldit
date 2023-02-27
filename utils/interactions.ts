import readline from "readline"
import fs from "fs"

// Create a readline interface to prompt the user for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// A function that prompts the user with a message and returns their response as a string
export const promptUser = (query: string) => {
  return new Promise<string>((resolve) => {
    rl.question(query, resolve)
  })
}

// A function that conditionally writes a file to disk based on whether it already exists and whether the user wants to overwrite it
export const conditionallyWriteFile = async (
  filePath: string,
  component: string,
  overwrite: boolean
) => {
  // Define a `writeFile` function that writes the component to the specified file path and logs the file write to the console
  const writeFile = () => {
    console.log(`Writing file @ ${filePath}...`)
    fs.writeFileSync(filePath, component, {})
  }

  // If the file already exists and the user does not want to overwrite it, prompt the user to confirm whether they want to overwrite it
  if (!overwrite && fs.existsSync(filePath)) {
    const response = await promptUser(
      `"${filePath}" already exists. Are you sure you want to overwrite it? Y/n `
    )

    // If the user confirms that they want to overwrite the file, write the file to disk
    if (response.toLowerCase() === "y" || !response) {
      writeFile()
    }
    return
  }

  // If the file does not already exist or the user confirms that they want to overwrite it, write the file to disk
  writeFile()
}

// A function that prompts the user with a message and returns their response as a boolean value
export const promptUserForBoolean = async (
  query: string,
  defaultValue: boolean
) => {
  const response = await promptUser(query)

  // If the user does not provide a response, return the default value
  if (!response) {
    return defaultValue
  }

  // Otherwise, return `true` if the user response is "y" (case-insensitive) and `false` otherwise
  return response.toLowerCase() === "y"
}

// A function that prompts the user for custom template information and updates the `customTemplateConfig` object accordingly
export const promptUserForCustomTemplates = async (customTemplateConfig: {
  enabled: boolean
  path: string
  templates: string[]
  defaultTemplatesEnabled: boolean
}) => {
  // Prompt the user to determine whether they want to use custom templates
  const useCustomTemplates = await promptUser(
    "Would you like to use custom templates? (y/N)  "
  )

  // If the user confirms that they want to use custom templates, update the `customTemplateConfig` object with the relevant information
  if (useCustomTemplates.toLowerCase() === "y") {
    customTemplateConfig.enabled = true
    customTemplateConfig.path = await promptUser(
      "Path to directory of templates: "
    )
    const templates = await promptUser("Templates to use: ")
    customTemplateConfig.templates = templates.split(/\W{1,}/g)

    const useDefaultTemplates = await promptUser(
      "Would you like to continue using the default templates? (y/N)  "
    )

    // If the user confirms that they want to continue using the default templates, update the `customTemplateConfig` object accordingly
    if (useDefaultTemplates.toLowerCase() === "y") {
      customTemplateConfig.defaultTemplatesEnabled = true
    }
  }
}
