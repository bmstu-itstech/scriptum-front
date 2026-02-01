import styles from './Loading.module.css';
export const Loading = () => {
  return (
    <div className={styles.loader} role='status' aria-label='Загрузка'>
      <div className={styles.dots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};
