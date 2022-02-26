
// lib
import { render, screen } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic')
jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

const posts = [{
  slug: 'fake-slug',
  title: 'fake-title',
  excerpt: 'fake-excerpt',
  updatedAt: 'fake-updateAt',
}]

describe('Posts page', () => {

  it('Renders correctly', () => {

    render(<Posts posts={posts} />)

    expect(screen.getByText('fake-title')).toBeInTheDocument()

  });

  it('loads initial data', async () => {

    const getPrismicMocked = mocked(getPrismicClient)

    getPrismicMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [{
          uid: 'fake-slug',
          data: {
            title: [{
              type: 'fake-type',
              text: 'fake-title'
            }],
            content: [{
              type: 'paragraph',
              text: 'fake-excerpt'
            }],
          },
          last_publication_date: '01-01-2022'
        }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'fake-slug',
            title: 'fake-title',
            excerpt: 'fake-excerpt',
            updatedAt: '01 de janeiro de 2022',
          }]
        }
      })
    )
  })
}) 