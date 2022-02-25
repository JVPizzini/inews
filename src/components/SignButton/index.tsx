//next
import { signIn, signOut,useSession } from 'next-auth/client'

//react
import { FaGithub,FaPlus } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

//styles
import styles from './styles.module.scss';
 
export function SignButton() {

  const [session] = useSession();

  return session ? (
    <button
      className={styles.signButton}
      type="button"
      onClick ={()=>signOut()}>
      <FaGithub color="#06d6a0" />
      {/* <img src={session.user.image} alt="teste" /> */}
      {session.user.name}
      <FiX color="#a8a8b3" className={styles.closeIcon}/>

    </button>
  ) : (
    <button
      className={styles.signButton}
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub color="#ffd166 " />
      Sign with Github
    </button>
  );
};




