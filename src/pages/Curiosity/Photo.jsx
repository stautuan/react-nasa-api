import styles from './Photo.module.css';
import { formatDate } from '../../utils/helpers';

function Photo({ photoData, error }) {
  return (
    <main className={styles.PhotoCard}>
      <span className={styles.error}>{error}</span>
      <article>
        {photoData && (
          <figure className={styles.Photo}>
            <img src={photoData.img_src} alt="photo of Mars surface" />
            <figcaption>
              Captured this stunning landscape on my daily drive on Sol{' '}
              {photoData.sol} ({formatDate(photoData.earth_date)}). Taken by my{' '}
              {photoData.camera.full_name} 📸
            </figcaption>
          </figure>
        )}
      </article>
    </main>
  );
}

export default Photo;
