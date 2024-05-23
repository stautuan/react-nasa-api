import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.Home}>
      <h1>
        <span className={styles.top}>Space</span>
        <span className={styles.bottom}>Exploration</span>
      </h1>
    </div>
  );
}

export default Home;
