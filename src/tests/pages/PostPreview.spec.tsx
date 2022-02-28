
// lib
import { render, screen } from '@testing-library/react';
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/client';
import { getPrismicClient } from '../../services/prismic';
import { useRouter } from 'next/router';

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/router')

const post = {
  slug: 'fake-slug',
  title: 'fake-title',
  content: 'fake-content',
  updatedAt: '01-01-2022',
}

describe('Post preview page', () => {

  it('Renders correctly', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<PostPreview post={post} />)

    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.content)).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading???')).toBeInTheDocument()

  });

  it('Redirects user to full post when subscribed', async () => {

    const pushMock = jest.fn()

    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([{
      activeSubscription: 'fake-active-subscriton'
    }, false])

    const useRouterMocked = mocked(useRouter)
    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<PostPreview post={post} />)

    expect(pushMock).toHaveBeenCalledWith(`/posts/${post.slug}`)
  })

  it('load initial data', async () => {

    const getPrismicMocked = mocked(getPrismicClient)
    getPrismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: post.title }
          ],
          content: [
            { type: 'paragraph', text: post.content }
          ],
        },
        last_publication_date: '01-01/2022'
      })
    } as any)
    
    const response = await getStaticProps({ params: { slug: post.slug } })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: post.slug,
            title: post.title,
            content: '<p>fake-content</p>',
            updatedAt: '01 de janeiro de 2022'
          }
        }
      })
    )
  })
}) 