import { useEffect, useState } from 'react';
import styles from '../styles/parkingMap.module.css';

const ParkingMap = () => {
    const [parkingSlots, setParkingSlots] = useState([]);

    // Mock
    useEffect(() => {
        const fetchParkingData = async () => {
            // Simulating data
            const mockParkingData = [
                { isOccupied: true },  // Slot 1
                { isOccupied: false }, // Slot 2
                { isOccupied: true },  // Slot 3
                { isOccupied: false }, // Slot 4
                { isOccupied: true },  // Slot 5
                { isOccupied: false }, // Slot 6
                { isOccupied: true },  // Slot 7
                { isOccupied: false }, // Slot 8
                { isOccupied: true },  // Slot 9
                { isOccupied: false }, // Slot 10
            ];
            setParkingSlots(mockParkingData);
        };

        fetchParkingData();
    }, []);

    return (
        <div className={styles.mapContainer}>
            {parkingSlots.map((slot, index) => (
                <div
                    key={index}
                    className={styles.parkingSlot}
                    style={{ backgroundColor: slot.isOccupied ? '#FFB6B3' : '#BDE7BD' }}
                >
                    Slot {index + 1}
                </div>
            ))}
        </div>
    );
};

export default ParkingMap;
