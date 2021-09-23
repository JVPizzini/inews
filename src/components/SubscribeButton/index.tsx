//styles
import styles from './styles.module.scss'

type SubscribeButtonProps ={
  priceId: string;
}

export function SubscribreButton({priceId} : SubscribeButtonProps){
  return(
  <button
    type="button"
    className={styles.subscribeButton}>
      Subscribre now
    </button>
  );
};