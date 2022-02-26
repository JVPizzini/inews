//next
import Head from "next/Head";
import { GetStaticProps } from 'next';
import Link from 'next/link';

// prismic 
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'
import { useSession } from "next-auth/client";

type post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string,
}

type PostsProps = {
  posts: post[],
}

export default function Posts({ posts }: PostsProps) {

  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Post | INews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.post}>
          {posts.map(post => (
            <Link key={post.slug} href={session ? `posts/${post.slug}` : `posts/preview/${post.slug}`}>
              <a>
                <time>{post.updatedAt} </time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'], 
    pageSize: 100,
  })

  const posts = response.results.map(post => {

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return { props: { posts } }
}

