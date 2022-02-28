
// lib
import { render, screen } from '@testing-library/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { mocked } from 'jest-mock';
import { getSession } from 'next-auth/client';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic')
jest.mock('next-auth/client')

const post = {
  slug: 'fake-slug',
  title: 'fake-title',
  content: 'fake-content',
  updatedAt: 'fake-updateAt',
}

describe('Post page', () => {

  it('Renders correctly', () => {

    render(<Post post={post} />)

    expect(screen.getByText('fake-title')).toBeInTheDocument()
    expect(screen.getByText('fake-content')).toBeInTheDocument()
  });

  it('redirects user if no subscription is found', async () => {

    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any)

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: 'fake-slug'
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining(
          {
            destination: '/',
          }
        )
      })
    )
  })

  it('load initial data', async () => {

    const getSessionMocked = mocked(getSession);
    const getPrismicMocked = mocked(getPrismicClient)

    getPrismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{
            type: 'heading',
            text: 'fake-title'
          }],
          content: [{
            type: 'paragraph',
            text: 'fake-content'
          }],
        },
        last_publication_date: '01-01-2022'
      })
    } as any)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any)

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: {
        slug: 'fake-slug'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'fake-slug',
            title: 'fake-title',
            content: '<p>fake-content</p>',
            updatedAt: '01 de janeiro de 2022'

          }
        }
      })
    )
  })
}) 