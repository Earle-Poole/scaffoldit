import { Options } from "../templates/config"

// Logs an error if one is passed in
export const handleError = (error: Error | null) => {
  if (error) {
    console.log("error: ", error)
  }
}

// Parses command-line arguments for options and returns an object with boolean values for each option
export const parseArgsForOptions = (args: string[]) => {
  const options: Partial<Record<Options, boolean>> = {}

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
