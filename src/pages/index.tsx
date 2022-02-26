
//next
import Head from "next/Head";
import { GetStaticProps } from 'next';

//components
import { SubscribeButton } from '../components/SubscribeButton'

//image

//styles
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

type HomeProps = {
  product: {
    priceId: string,
    amount: string,
  }

}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Inews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero} >
          <span>
            🐔 hey, welcome!!!
            <h1>Here you scratch the news and we <span>SHOCK</span> people!.</h1>
            <p>
              Get access to all the publicatios <br />
              <span>for {product.amount} month</span>

            </p>
            <SubscribeButton />
          </span>
        </section>

        <img src="/images/News_Anchor.svg" alt="imagem home" />

      </main>
    </>

  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1JcKSEDacwOL5yxFfN6akyVp')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),

  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}