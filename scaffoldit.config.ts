import { ScaffolditConfig } from "./global.d"

export default {
  forceOverwrite: false,
  noEntry: false,
  noStories: false,
  noTests: false,
  noTypescript: false,
  customTemplates: {
    enabled: false,
    path: "",
    templates: [],
    defaultTemplatesEnabled: true,
  },
} as ScaffolditConfig
