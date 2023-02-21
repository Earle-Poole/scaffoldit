import { useTypescript } from "../index"
export default (destination: string, name: string) => {
  let string = ""

  if (useTypescript) {
    string += `import { Meta, Story } from '@storybook/react/types-6-0'\nimport { ${name}Props } from './${name}.types'\n`
  }

  string += `import ${name} from './${name}'

const MetaData = {
  args: {},
  component: ${name},
  title: '${destination.split("/").at(-1)}/${name}',
}${useTypescript ? " as Meta" : ""}

const Template${
    useTypescript ? `: Story<${name}Props>` : ""
  } = (args) => <${name} {...args} />
const Default = Template.bind({})

export { Default }

export default MetaData
`

  return string
}
