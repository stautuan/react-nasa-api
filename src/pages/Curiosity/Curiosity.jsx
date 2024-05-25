import { useEffect, useState } from 'react';
import styles from './Curiosity.module.css';
import Header from './Header';
import Date from './Date';
import Photo from './Photo';
import Loader from '../../components/Loader/Loader';

const apiKey = import.meta.env.VITE_NASA_KEY;

function Curiosity() {
  const [date, setDate] = useState('');
  const [photoData, setPhotoData] = useState(null);
  const [caption, setCaption] = useState('');
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date) return;

    async function getPhoto() {
      // Fetching process has started
      setLoadingPhoto(true);
      setLoadingCaption(true);

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
          setLoadingPhoto(false);
          setLoadingCaption(false);
        } else {
          const photo = data.photos[0];
          setPhotoData(photo);
          setLoadingPhoto(false);

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
          setCaption(captionData);
          setLoadingCaption(false);
        }
      } catch (error) {
        setError(error);
        setLoadingPhoto(false);
        setLoadingCaption(false);
      }
    }

    getPhoto();
  }, [date]);

  // If both are false, loading animation will stop rendering
  const isLoading = loadingPhoto || loadingCaption;

  return (
    <div className={styles.Curiosity}>
      <Header />
      <Date date={date} onSetDate={setDate} />
      {isLoading ? (
        <Loader />
      ) : (
        <Photo photoData={photoData} caption={caption} error={error} />
      )}
    </div>
  );
}

export default Curiosity;
