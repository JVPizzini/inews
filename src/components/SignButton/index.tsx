
//assets
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
//styles
import styles from './styles.module.scss';

export function SignButton() {

  const isUserLoggedIn = true;

  return (
    <button
      className={styles.signButton}
      type="button">
      <FaGithub
        color={isUserLoggedIn ? "#06d6a0" : "#ffd166 "} />
      {isUserLoggedIn ? "João Vitor Pizzini" : "Sign with Github"}
      <FiX color="#a8a8b3"/>
    </button>
  );
};