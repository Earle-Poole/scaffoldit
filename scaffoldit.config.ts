export default {
  forceOverwrite: false,
  noEntry: false,
  noStories: false,
  noTests: false,
  noTypescript: false,
  customTemplates: {
    enabled: true,
    path: "scaffolding",
    templates: [
      // [template filename, file extension]
      ["tests", "ts"],
      ["story", "ts"],
    ],
    defaultTemplatesEnabled: false,
  },
}
