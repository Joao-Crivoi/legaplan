import React from 'react';
import styles from '../../styles/Header/Header.module.scss';
const CurrentDate: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  return <div className={styles.date}>{formattedDate}</div>;
};

export default CurrentDate;
