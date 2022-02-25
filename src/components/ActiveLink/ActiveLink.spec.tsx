import { render, screen } from '@testing-library/react';
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
    render(
      <ActiveLink href='/' activeClassName='active' >
        <div>teste</div>
      </ActiveLink>
    )

    expect(screen.getByText('teste')).toBeInTheDocument()
  });

  it('=> Receving  active class', () => {
    render(
      <ActiveLink href='/' activeClassName='active' >
        <div>teste</div>
      </ActiveLink>
    )

    expect(screen.getByText('teste')).toHaveClass('active')
  })
})