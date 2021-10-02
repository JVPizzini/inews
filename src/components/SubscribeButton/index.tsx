//styles
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

type SubscribeButtonProps = {
  priceId: string;
}

export function SubscribreButton({ priceId }: SubscribeButtonProps) {

  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {

    if (!session) {
      signIn('gitguh')
      return;
    }

    if(session.activeSubscription){
      router.push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId: sessionId })

    } catch (err) {
      alert(err.message);
    }
  }


  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribre now
    </button>
  );
};