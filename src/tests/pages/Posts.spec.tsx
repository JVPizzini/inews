
// lib
import { render, screen } from '@testing-library/react';
import Post, { getStaticProps } from '../../pages/posts';
import { useSession } from 'next-auth/client';
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

    render(<Post posts={posts} />)

    expect(screen.getByText('fake-title')).toBeInTheDocument()

  });

  it('loads initial data', () => {

    const getPrismicMocked = mocked(getPrismicClient)

    getPrismicMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [{
          uid: 'fake-uid',
          title: 'fake-title',
          content:'fake-content',
          ast_publication_date: new Date()
        }
        ]
      })
    } as any)

    render(<Post posts={posts} />)

    expect(screen.getByText('fake-title')).toBeInTheDocument()

  })
}) 