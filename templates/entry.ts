import { useTypescript } from "../index"

export default (name: string) => `export { default } from './${name}'
${useTypescript ? `export * from './${name}.types'` : ""}
`