import { useTypescript } from "../constants"

export default (name: string) => `export { default } from './${name}'
${useTypescript ? `export * from './${name}.types'` : ""}
`
