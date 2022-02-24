import { render } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
  it('=> Renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active' >
        <div>teste</div>
      </ActiveLink>
    )

    expect(getByText('teste')).toBeInTheDocument()
  });

  it('=> Receving  active class', () => {
    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active' >
        <div>teste</div>
      </ActiveLink>
    )

    expect(getByText('teste')).toHaveClass('active')
  })
})