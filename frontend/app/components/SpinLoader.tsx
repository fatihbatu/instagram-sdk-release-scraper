import styles from './SpinLoader.module.css'; // Import CSS for styling (optional)

const SpinLoader = () => {
  return (
    <div className={`${styles.loader} `}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default SpinLoader;
