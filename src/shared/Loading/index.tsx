import styles from './Loading.module.css';
export const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.dots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};
