import { init, writeDefaultTemplateFiles } from "./utils/template-fns.js"
import { mkdirSync } from "node:fs"
import { PATHS, customTemplatesConfig, options } from "./constants/index.js"

async function main() {
  // If the `init` option is set, remove it from the options object before callling the `init` function
  if (options.init) {
    delete options.init
    await init(options, customTemplatesConfig)
  }

  const rootPathExists = await Bun.file(PATHS.getRoot()).exists()
  // If the rootPath directory doesn't exist, create it
  if (!rootPathExists) {
    mkdirSync(PATHS.getRoot(), { recursive: true })
  }

  if (customTemplatesConfig.defaultTemplatesEnabled) {
    await writeDefaultTemplateFiles()
  }

  process.exit(0)
}

main()
