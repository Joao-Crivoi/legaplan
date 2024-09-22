import Image from 'next/image';
import styles from '../../styles/Header/Header.module.scss';
import LogoImg from '../../../../public/assets/Logomark.svg';
import LogoText from '../../../../public/assets/Logotype.svg';
import CurrentDate from './CurrentDate';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={LogoImg} alt="Logomark" />
        <Image src={LogoText} alt="Logotype" />
      </div>
      <h1>Bem-vindo de volta, Marcus</h1>
      <CurrentDate /> 
    </header>
  );
}
