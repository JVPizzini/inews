
//next
import Head from 'next/Head'

//components
import { SubscribreButton } from '../components/SubscribeButton'

//image

//styles
import styles from './home.module.scss';


export default function Home() {
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
              <span>for $999.90 month</span>

            </p>
            <SubscribreButton/>
          </span>
        </section>
        
        <img src="/images/News_Anchor.svg" alt="imagem home" />

      </main>
    </>

  )
}
