"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';

export default function Home() {
  const [envelopeState, setEnvelopeState] = useState<'close' | 'midway' | 'open'>('close');
  const [isWebsiteVisible, setIsWebsiteVisible] = useState(false);

  const handleEnvelopeClick = () => {
    if (envelopeState !== 'close') return;

    // Go to midway state
    setEnvelopeState('midway');

    // Wait a brief moment, then go to fully open state
    setTimeout(() => {
      setEnvelopeState('open');

      // Wait for user to see the open envelope, then reveal website
      setTimeout(() => {
        setIsWebsiteVisible(true);
      }, 1000);
    }, 450); // Increased to 450ms for a slightly slower midway frame transition
  };

  if (!isWebsiteVisible) {
    return (
      <div className={styles.envelopeOverlay} onClick={handleEnvelopeClick}>
        <div className={styles.envelopeContainer}>
          <Image
            src="/assets/envelope_close.png"
            alt="Wedding Invitation Envelope Closed"
            width={1000}
            height={700}
            priority
            className={`${styles.envelopeImage} ${envelopeState === 'close' ? styles.visible : styles.hidden}`}
          />
          <Image
            src="/assets/envelope_midway.png"
            alt="Wedding Invitation Envelope Midway"
            width={1000}
            height={700}
            priority
            className={`${styles.envelopeImageAbsolute} ${envelopeState === 'midway' ? styles.visible : styles.hidden}`}
          />
          <Image
            src="/assets/envelope_open.png"
            alt="Wedding Invitation Envelope Open"
            width={1000}
            height={700}
            priority
            className={`${styles.envelopeImageAbsolute} ${envelopeState === 'open' ? styles.visible : styles.hidden} ${envelopeState === 'open' ? styles.opened : ''}`}
          />
          {envelopeState === 'close' && (
            <p className={styles.envelopeInstruction}>Click to open</p>
          )}
        </div>
      </div>
    );
  }

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

          <div className={`${styles.galleryRow} ${styles.rowReverse}`}>
            <div className={`${styles.galleryImageContainer} ${styles.afterWeddingImageContainer}`}>
              <Image
                src="/assets/table.png"
                alt="After Wedding Table"
                width={800}
                height={800}
                className={`${styles.galleryImage} ${styles.afterWeddingImage}`}
              />
            </div>
            <div className={styles.galleryTextCenter}>
              <h3 className={`${styles.weddingDayTitle} ${styles.afterWeddingTitle}`}>The After wedding</h3>
              <p className={styles.weddingDayDetails}>
                23 FEBRUARY 2026<br /><br />
                THE Zafa<br />CAIRO, EGYPT<br /><br />
                AT 7:00 PM<br /><br />
                DRESS CODE: BLACK & WHITE
              </p>
              <button className={styles.secondaryButton}>Hometown</button>
            </div>
          </div>
        </div>
      </section>

      {/* Good to know Section */}
      <section className={styles.whereToStaySection}>
        <div className={styles.container}>
          <h2 className={`${styles.weddingDayTitle} ${styles.whereToStayTitle}`}>Good to know</h2>


          <div className={styles.hotelsGrid}>
            <div className={styles.hotelCard}>
              <h4 className={styles.hotelName}>Capture the moments and share them with us</h4>
              <p className={styles.hotelDetails}>Snap as many photos as you'd like and don't forget to tag us or send us your favorites after the celebration!</p>
            </div>
            <div className={styles.hotelCard}>
              <h4 className={styles.hotelName}>Make Memories</h4>
              <p className={styles.hotelDetails}>Laugh, dance, celebrate, and capture every special moment.</p>
            </div>
            <div className={styles.hotelCard}>
              <h4 className={styles.hotelName}>Parking available</h4>
              <p className={styles.hotelDetails}>There is plenty of parking at the venue, so feel free to drive and park your car.</p>
            </div>
          </div>

          <p className={styles.whereToStayFooter}>
            Thank you for being part of our special day. Your presence means the world to us. Relax, have fun, and make unforgettable memories.          </p>

          <div className={styles.houseImageContainer}>
            <Image
              src="/assets/house.png"
              alt="House"
              width={1000}
              height={500}
              className={styles.houseImage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
