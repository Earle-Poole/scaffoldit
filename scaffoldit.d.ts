export interface ScaffolditConfig {
  forceOverwrite: boolean
  noEntry: boolean
  noStories: boolean
  noTests: boolean
  noTypescript: boolean
  customTemplates: {
    enabled: boolean
    path: string
    templates: string[][]
    defaultTemplatesEnabled: boolean
  }
}

declare const scaffolditConfig: ScaffolditConfig
export default scaffolditConfig