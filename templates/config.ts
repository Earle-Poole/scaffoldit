export interface CustomTemplatesConfig {
  enabled: boolean
  path: string
  templates: string[][]
  defaultTemplatesEnabled: boolean
}

export enum Options {
  forceOverwrite = "forceOverwrite",
  init = "init",
  noEntry = "noEntry",
  noStories = "noStories",
  noTests = "noTests",
  noTypescript = "noTypescript",
}

export default ({
  forceOverwrite,
  noEntry,
  noStories,
  noTests,
  noTypescript,
  customTemplates,
}: Omit<Record<Options, boolean>, Options.init> & {
  customTemplates: CustomTemplatesConfig
}) => `export default {
  forceOverwrite: ${forceOverwrite},
  noEntry: ${noEntry},
  noStories: ${noStories},
  noTests: ${noTests},
  noTypescript: ${noTypescript},
  customTemplates: {
    enabled: ${customTemplates.enabled},
    path: "${customTemplates.path}",
    templates: ${JSON.stringify(customTemplates.templates)}${
  noTypescript ? "" : " as string[][]"
}},
    defaultTemplatesEnabled: ${customTemplates.defaultTemplatesEnabled}
  },
`
