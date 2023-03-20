import { useTypescript } from "../index"

export default (name: string) => {
  const propsName = `${name}Props`
  let string = ""

  if (useTypescript) {
    string = `import { FC } from 'react'\nimport { ${propsName} } from './${name}.types'\n\n`
  }

  string += `const ${name}${
    useTypescript ? `: FC<${propsName}>` : ""
  } = (props) => {
  const {} = props
  
  return <div></div>
}

export default ${name}
`
  return string
}
