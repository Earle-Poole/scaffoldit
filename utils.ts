import fs from "fs"
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export const handleError = (error: Error | null) => {
  if (error) {
    console.log("error: ", error)
  }
}

enum Options {
  forceOverwrite = "forceOverwrite",
  init = "init",
  noEntry = "noEntry",
  noStories = "noStories",
  noTests = "noTests",
  noTypescript = "noTypescript",
}

export const parseArgsForOptions = (args: string[]) => {
  const options: Record<Options, boolean> = {
    forceOverwrite: false,
    init: false,
    noEntry: false,
    noStories: false,
    noTests: false,
    noTypescript: false,
  }

  args.forEach((arg) => {
    switch (arg) {
      case "-f":
      case "--force":
        options.forceOverwrite = true
        break
      case "-i":
      case "--init":
        options.init = true
        break
      case "-ne":
      case "--no-entry":
        options.noEntry = true
        break
      case "-ns":
      case "--no-stories":
        options.noStories = true
        break
      case "-nt":
      case "--no-tests":
        options.noTests = true
        break
      case "-nts":
      case "--no-typescript":
        options.noTypescript = true
        break
      default:
        break
    }
  })

  return options
}

export const promptUser = (query: string) => {
  return new Promise<string>((resolve) => {
    rl.question(query, resolve)
  })
}

export const conditionallyWriteFile = async (
  filePath: string,
  component: string,
  overwrite: boolean
) => {
  const writeFile = () => {
    console.log(`Writing file @ ${filePath}...`)
    fs.writeFileSync(filePath, component, {})
  }

  if (overwrite) {
    writeFile()
    return
  }

  if (fs.existsSync(filePath)) {
    const response = await promptUser(
      `"${filePath}" already exists. Are you sure you want to overwrite it? Y/n `
    )

    if (response.toLowerCase() === "y" || !response) {
      writeFile()
      return
    }
  } else {
    writeFile()
  }
}
