import { useEffect, useState } from 'react';
import styles from './Curiosity.module.css';
import Header from './Header';
import Date from './Date';
import Photo from './Photo';

const apiKey = import.meta.env.VITE_NASA_KEY;

function Curiosity() {
  const [date, setDate] = useState('2024-02-19');
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date) return;

    async function getPhoto() {
      try {
        setPhotoData(null);
        setError(null);

        const endpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`;
        const response = await fetch(endpoint);

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.photos.length === 0) {
          setError(
            'Not much to report today, just hanging out and charging my batteries. Thank you for checking out my page 🥰'
          );
        } else {
          setPhotoData(data.photos[0]);
        }

        console.log(response, data);
      } catch (error) {
        setError(
          'Not much to report today, just hanging out and charging my batteries. Thank you for checking out my page 🥰'
        );
      }
    }

    getPhoto();
  }, [date]);

  return (
    <div className={styles.Curiosity}>
      <Header />
      <Date date={date} onSetDate={setDate} />
      <Photo photoData={photoData} error={error} />
    </div>
  );
}

export default Curiosity;
