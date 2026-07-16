import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section with Central Gate */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.preTitle}>TOGETHER WITH THEIR FAMILIES,</p>
          <h1 className={styles.title}>Pankaj & Designer girl</h1>
          <p className={styles.subtitle}>Joyfully invite you to celebrate their wedding weekend</p>
          <p className={styles.dateLocation}>FEBRUARY 22, 2026 &nbsp;&middot;&nbsp; INDORE, INDIA</p>
          
          <button className={styles.rsvpButton}>Kindly RSVP by 10 March</button>
        </div>

        <div className={styles.centralImageWrapper}>
          <Image 
            src="/assets/Gate.png" 
            alt="Wedding Archway" 
            width={900} 
            height={600} 
            priority
            className={styles.centralImage}
          />
        </div>
      </section>

      {/* Alternating Images Section */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>Our Story</h2>
          
          <div className={styles.galleryRow}>
            <div className={styles.galleryImageContainer}>
              <Image 
                src="/assets/Chair.png" 
                alt="Wedding Decor Left" 
                width={500} 
                height={500} 
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryText}>
              <h3>A Beautiful Beginning</h3>
              <p>Join us as we embark on a new journey together. Our love story has been nothing short of magical, and we can't wait to share our special day with all our loved ones.</p>
            </div>
          </div>

          <div className={`${styles.galleryRow} ${styles.rowReverse}`}>
            <div className={styles.galleryImageContainer}>
              {/* Using Chair.png as a placeholder for the right image as well, user will provide rest */}
              <Image 
                src="/assets/Chair.png" 
                alt="Wedding Decor Right" 
                width={500} 
                height={500} 
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryText}>
              <h3>The Celebration</h3>
              <p>Get ready for a weekend filled with love, laughter, and unforgettable memories. We've planned a beautiful celebration that reflects our journey and dreams for the future.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
