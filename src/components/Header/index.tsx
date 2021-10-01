
//Next
// import Image from 'next/image';
// import logoimg from '../../public/images/logo-chicken2.svg'

// react
import Link from 'next/link';

//Components
import { SignButton } from '../SignButton'
import { ActiveLink } from '../../components/ActiveLink';
// image

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContext}>
        {/* <Image className={styles.contentImg} src={logoimg} alt="logo" width="40" height="40" /> */}
        <img src="/images/logo-chicken2.svg" alt="logo da header" />
        <h1>I.News</h1>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active} prefetch>
            <a >Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active} prefetch>
            <a >Post</a>
          </ActiveLink>
        </nav>
        <SignButton />
      </div>
    </header>
  );
};