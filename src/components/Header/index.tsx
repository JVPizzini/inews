
//Next
import Image from 'next/image';
import logoimg from '../../public/images/logo-chicken2.svg'

//Components
import { SignButton }  from '../SignButton'

// image

import styles from  './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContext}>
        {/* <Image className={styles.contentImg} src={logoimg} alt="logo" width="40" height="40" /> */}
        <img src="/images/logo-chicken2.svg" alt="logo da header" />
        <h1>I.News</h1>
        <nav>
          <a className={styles.active} href="">Home</a>
          <a href="">Post</a>
        </nav>
        <SignButton/>
      </div>
    </header>
  );
};