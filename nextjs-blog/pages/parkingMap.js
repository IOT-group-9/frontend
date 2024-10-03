import { useEffect, useState } from 'react';
import styles from '../styles/parkingMap.module.css';

const ParkingMap = () => {
    const [parkingSlots, setParkingSlots] = useState([]);

    // simulate
    useEffect(() => {
        const fetchParkingData = async () => {
            const mockParkingData = [
                { id: 1, x: 0, y: 0, width: 100, height: 150, isOccupied: true },
                { id: 2, x: 125, y: 0, width: 100, height: 150, isOccupied: false },
                { id: 3, x: 250, y: 0, width: 100, height: 150, isOccupied: true },
                { id: 4, x: 375, y: 0, width: 100, height: 150, isOccupied: false },
                { id: 5, x: 500, y: 0, width: 100, height: 150, isOccupied: true },
                { id: 6, x: 625, y: 0, width: 100, height: 150, isOccupied: false },
                { id: 7, x: 750, y: 0, width: 100, height: 150, isOccupied: true },
                { id: 8, x: 875, y: 0, width: 100, height: 150, isOccupied: false },
                { id: 9, x: 0, y: 175, width: 100, height: 150, isOccupied: true },
                { id: 10, x: 125, y: 175, width: 100, height: 150, isOccupied: false },
                { id: 11, x: 250, y: 175, width: 100, height: 150, isOccupied: true },
                { id: 12, x: 375, y: 175, width: 100, height: 150, isOccupied: false },
                { id: 13, x: 500, y: 175, width: 100, height: 150, isOccupied: true },
                { id: 14, x: 625, y: 175, width: 100, height: 150, isOccupied: false },
                { id: 15, x: 750, y: 175, width: 100, height: 150, isOccupied: true },
                { id: 16, x: 875, y: 175, width: 100, height: 150, isOccupied: false },
            ];
            setParkingSlots(mockParkingData);
        };

        fetchParkingData();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {parkingSlots.map(slot => (
                    <div
                        key={slot.id}
                        className={styles.parkingSlot}
                        style={{
                            left: `${slot.x}px`,
                            top: `${slot.y}px`,
                            width: `${slot.width}px`,
                            height: `${slot.height}px`,
                            backgroundColor: slot.isOccupied ? '#FFB6B3' : '#BDE7BD'
                        }}
                    >
                        Slot {slot.id}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkingMap;
