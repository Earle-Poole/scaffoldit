export default (name: string) => `import ${name} from './'
import { render } from '@testing-library/react'

describe('${name}', () => {
  it('should ...', () => {
    const { container } = render(<${name} />)

    expect(container).not.toThrowError()
  })
})
`
