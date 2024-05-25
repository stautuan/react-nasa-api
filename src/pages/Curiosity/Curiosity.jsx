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
  const [caption, setCaption] = useState('');

  useEffect(() => {
    if (!date) return;

    async function getPhoto() {
      try {
        setPhotoData(null);
        setError(null);

        // Fetch Mars photo data from NASA API
        const endpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`;
        const response = await fetch(endpoint);

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.photos.length === 0) {
          setError(
            'Sorry, no photos available for this date. Just hanging out and charging my batteries. Thank you for checking out my page 🥰'
          );
        } else {
          const photo = data.photos[0];
          setPhotoData(photo);

          // Feed the fetched image to generate caption
          const captionResponse = await fetch(
            'http://localhost:3000/generate-captions',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ image: data.photos[0].img_src }),
            }
          );

          const captionData = await captionResponse.json();
          console.log(captionData);
          setCaption(captionData);
        }

        console.log(response, data);
      } catch (error) {
        setError(
          'Sorry, no photos available for this date. Just hanging out and charging my batteries. Thank you for checking out my page 🥰'
        );
      }
    }

    getPhoto();
  }, [date]);

  return (
    <div className={styles.Curiosity}>
      <Header />
      <Date date={date} onSetDate={setDate} />
      <Photo photoData={photoData} caption={caption} error={error} />
    </div>
  );
}

export default Curiosity;
