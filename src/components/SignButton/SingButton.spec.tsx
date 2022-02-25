import { render, screen } from '@testing-library/react';
import { SignButton } from '.';
import { useSession } from 'next-auth/client'
import { mocked } from 'jest-mock'

jest.mock('next-auth/client')

describe('SignButton component', () => {
  it('=> Renders correctly when user is not authenticated', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignButton />)
    expect(screen.getByText('Sign with Github')).toBeInTheDocument()
  });

  it('=> Renders correctly when user is authenticated', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: "Test João Pizzini",
        email: "EmailTest@Test.com",
        image: "AvatarTest"
      },
      expires: "fake-expire"
    }, false])

    render(<SignButton />)
    expect(screen.getByText("Test João Pizzini")).toBeInTheDocument()
    

  });
})