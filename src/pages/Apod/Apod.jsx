import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/helpers';
import styles from './Apod.module.css';

const apiKey = import.meta.env.VITE_NASA_KEY;

function Apod() {
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPhoto() {
      try {
        const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        const response = await axios.get(endpoint);
        const data = response.data;
        setPhotoData(data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    }
    getPhoto();
  }, []);

  return (
    <main className={styles.Apod}>
      <h1>
        <span>Astronomy Picture</span>
        <span>of the Day</span>
      </h1>
      <section>
        <p className={styles.error}>{error}</p>
        {/* Conditionally render on whether data has been fetched or not */}
        {photoData && (
          <article>
            <div className={styles.heading}>
              <span className={styles.date}>{formatDate(photoData.date)}</span>
              <h2 className={styles.title}>{photoData.title}</h2>
            </div>
            {photoData.media_type === 'image' ? (
              <a href={photoData.hdurl}>
                <img
                  className={styles.img}
                  src={photoData.hdurl}
                  alt={photoData.title}
                />
              </a>
            ) : (
              <iframe className={styles.video} src={photoData.url}></iframe>
            )}
            <p className={styles.explanation}>{photoData.explanation}</p>
          </article>
        )}
      </section>
    </main>
  );
}

export default Apod;
