import { useTypescript } from "../index.js"

export default (name: string) => `export { default } from './${name}'
${useTypescript ? `export * from './${name}.types'` : ""}
`
