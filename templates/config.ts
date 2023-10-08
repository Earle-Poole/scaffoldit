import { CustomTemplatesConfig, Options } from "../types"

export default ({
  forceOverwrite,
  noEntry,
  noStories,
  noTests,
  noTypescript,
  customTemplates,
}: Omit<Record<Options, boolean>, Options.init> & {
  customTemplates: CustomTemplatesConfig
}) => `module.exports = {
  forceOverwrite: ${forceOverwrite},
  noEntry: ${noEntry},
  noStories: ${noStories},
  noTests: ${noTests},
  noTypescript: ${noTypescript},
  customTemplates: {
    enabled: ${customTemplates.enabled},
    path: '${customTemplates.path}',
    templates: ${JSON.stringify(customTemplates.templates)},
    defaultTemplatesEnabled: ${customTemplates.defaultTemplatesEnabled},
  },
}
`
