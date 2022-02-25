import { render, screen, fireEvent } from '@testing-library/react';
import { SubscribeButton } from '.';
import { signIn, useSession } from 'next-auth/client'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'

jest.mock('next-auth/client');
jest.mock('next/router');

describe('SubscribreButton component', () => {
  it('=> Renders correctly ', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    const { debug } = render(<SubscribeButton />)

    expect(screen.getByText('Subscribre now')).toBeInTheDocument()
  });

  it('=> Redirect user to signIn when not authentication ', () => {
    
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)
    
    useSessionMocked.mockReturnValueOnce([null, false])
    
    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribre now');

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  });

  it('=> Redirects to post when user already has a subscription', () => {

    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "Test Joao Pizzini",
          email: "EmailTest@Test.com",
          image: "AvatarTest"
        },
        activeSubscription: "fake-active-subscription",
        expires: "fake-expire"
      },
      false
    ])


    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribre now');
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalled();

  });
});