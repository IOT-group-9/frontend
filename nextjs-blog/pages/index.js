import ParkingMap from './/parkingMap.js';
import styles from '../styles/Home.module.css';


export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Parking Map</h1>
      <ParkingMap />
    </div>
  );
}
