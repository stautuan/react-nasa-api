import styles from './Photo.module.css';
import { formatDate } from '../../utils/helpers';

function Photo({ photoData, caption, error }) {
  return (
    <main className={styles.PhotoCard}>
      <span className={styles.error}>{error}</span>
      <article>
        {photoData && caption && (
          <figure className={styles.Photo}>
            <img src={photoData.img_src} alt="photo of Mars surface" />
            <figcaption>
              {caption.replace(/"/g, '')} Taken on Sol {photoData.sol} (
              {formatDate(photoData.earth_date)}) by my{' '}
              {photoData.camera.full_name} 📸`
            </figcaption>
          </figure>
        )}
      </article>
    </main>
  );
}

export default Photo;
