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
