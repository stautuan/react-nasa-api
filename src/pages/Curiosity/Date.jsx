import styles from './Date.module.css';

function Date({ date, onSetDate }) {
  return (
    <input
      className={styles.Date}
      type="date"
      value={date}
      max="2024-02-19"
      onChange={(e) => onSetDate(e.target.value)}
    />
  );
}

export default Date;
