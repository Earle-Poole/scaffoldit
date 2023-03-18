import readline from "readline"
import fs from "fs"

// Readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Pass the a query to prompt the user, and returns a promise that resolves with the user's response
export const promptUser = (query: string) => {
  return new Promise<string>((resolve) => {
    rl.question(query, resolve)
  })
}

// Writes the component to the specified file path and logs the file write to the console
const writeFile = (filePath: string, component: string) => {
  console.log(`Writing file @ ${filePath}...`)
  fs.writeFileSync(filePath, component, {})
}

export const conditionallyWriteFile = async (
  filePath: string,
  component: string,
  overwrite: boolean
) => {
  // If the file already exists and the user does not want to overwrite it, prompt the user to confirm overwriting
  if (!overwrite && fs.existsSync(filePath)) {
    const response = await promptUser(
      `"${filePath}" already exists. Are you sure you want to overwrite it? Y/n `
    )

    if (response.toLowerCase() === "y" || !response) {
      writeFile(filePath, component)
    }
    return
  }

  writeFile(filePath, component)
}

export const promptUserForBoolean = async (
  query: string,
  defaultValue: boolean
) => {
  const response = await promptUser(query)

  // If the user does not provide a response, return the default value
  if (!response) {
    return defaultValue
  }

  return response.toLowerCase() === "y"
}

export const promptUserForCustomTemplates = async (customTemplateConfig: {
  enabled: boolean
  path: string
  templates: string[][]
  defaultTemplatesEnabled: boolean
}) => {
  const useCustomTemplates = await promptUser(
    "Would you like to use custom templates? (y/N)  "
  )

  // Update customTemplateConfig with user's responses (if confirmed for custom templates)
  if (useCustomTemplates.toLowerCase() === "y") {
    customTemplateConfig.enabled = true
    customTemplateConfig.path = await promptUser(
      "Path to directory of templates: "
    )
    const templates = await promptUser("Templates to use: ")
    customTemplateConfig.templates = templates
      .split(/\W{1,}/g)
      .map((t) => t.split("@"))

    const useDefaultTemplates = await promptUser(
      "Would you like to continue using the default templates? (y/N)  "
    )

    // If default templates are confirmed, update customTemplateConfig accordingly
    if (useDefaultTemplates.toLowerCase() === "y") {
      customTemplateConfig.defaultTemplatesEnabled = true
    }
  }
}
