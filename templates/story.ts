import { useTypescript } from "../index.js"
export default (name: string, destination: string) => {
  let string = ""

  if (useTypescript) {
    string += `import { Meta, StoryObj } from '@storybook/react'\nimport { ${name}Props } from './${name}.types'\n`
  }

  string += `import ${name} from './${name}'

const args${useTypescript ? `: ${name}Props` : ""} = {}

const MetaData = {
  args,
  component: ${name},
  title: '${destination.split("/").at(-1)}/${name}',
}${useTypescript ? " as Meta" : ""}


const ${name}Component = (args:) => {
  return (
    <${name} {...args} />
  )
}
const Template${useTypescript ? `: StoryObj<${name}Props>` : ""} = (args) = {
    render: (args) => {
      <${name} {...args} />
    }
  }

const Default: StoryObj<${name}Props> = {
  ...Template,
  args: args${useTypescript ? " as ${name}Props" : ""}
}

export { Default }

export default MetaData
`

  return string
}
