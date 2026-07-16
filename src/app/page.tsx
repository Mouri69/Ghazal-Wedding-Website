import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section with Central Gate */}
      <section className={styles.heroSection}>
        <div className={styles.centralImageWrapper}>
          <Image
            src="/assets/Gate.png"
            alt="Wedding Archway"
            width={950}
            height={600}
            priority
            className={styles.centralImage}
          />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.preTitle}>TOGETHER WITH THEIR FAMILIES,</p>
          <h1 className={styles.title}>Ghazal & Ghazal's wife</h1>
          <p className={styles.subtitle}>Joyfully invite you to celebrate their wedding weekend</p>
          <p className={styles.dateLocation}>FEBRUARY 22, 2026 &nbsp;&middot;&nbsp; CAIRO, EGYPT</p>

          <button className={styles.rsvpButton}>Kindly RSVP by 10 March</button>
        </div>
      </section>

      {/* Event Details Section */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.galleryRow}>
            <div className={styles.galleryImageContainer}>
              <div className={styles.chairWrapper}>
                <Image
                  src="/assets/umbrella.png"
                  alt="Umbrella"
                  width={200}
                  height={200}
                  className={styles.umbrellaImage}
                />
                <Image
                  src="/assets/Chair.png"
                  alt="Wedding Chair"
                  width={500}
                  height={500}
                  className={styles.galleryImage}
                />
              </div>
            </div>
            <div className={styles.galleryTextCenter}>
              <h3 className={styles.weddingDayTitle}>Wedding Day</h3>
              <p className={styles.weddingDayDetails}>
                22 FEBRUARY 2026<br /><br />
                FIVE STAR HOTEL, CAIRO, EGYPT<br /><br />
                AT 6:30 PM<br /><br />
                DRESS CODE: FORMAL
              </p>
              <button className={styles.secondaryButton}>Hometown</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
