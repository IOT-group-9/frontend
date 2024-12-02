import { useEffect, useState } from 'react';
import styles from '../styles/parkingMap.module.css';

const ParkingMap = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const MAP = 1;
  const LEVEL = 1;
  const PLACE = 1;
  // simulate
  useEffect(() => {
    const fetchParkingData = async () => {
      //     should return this
      // let mockParkingData = [
      //     { 'id': 1, 'x1': 0, 'y1': 0, 'x2': 100, 'y2': 150, 'occupied': "available" },
      //     { 'id': 2, 'x1': 125, 'y1': 0, 'x2': 225, 'y2': 150, 'occupied': "occupied" },
      //     { 'id': 3, 'x1': 250, 'y1': 0, 'x2': 350, 'y2': 150, 'occupied': "offline" },
      //     { 'id': 4, 'x1': 375, 'y1': 0, 'x2': 475, 'y2': 150, 'occupied': "offline" },
      //     { 'id': 5, 'x1': 500, 'y1': 0, 'x2': 600, 'y2': 150, 'occupied': "offline" },
      //     { 'id': 6, 'x1': 625, 'y1': 0, 'x2': 725, 'y2': 150, 'occupied': "offline" },
      //     { 'id': 7, 'x1': 750, 'y1': 0, 'x2': 850, 'y2': 150, 'occupied': "offline" },
      //     { 'id': 8, 'x1': 875, 'y1': 0, 'x2': 975, 'y2': 150, 'occupied': "offline" },
      //     { 'id': 9, 'x1': 0, 'y1': 175, 'x2': 100, 'y2': 325, 'occupied': "offline" },
      //     { 'id': 10, 'x1': 125, 'y1': 175, 'x2': 225, 'y2': 325, 'occupied': "offline" },
      //     { 'id': 11, 'x1': 250, 'y1': 175, 'x2': 350, 'y2': 325, 'occupied': "offline" },
      //     { 'id': 12, 'x1': 375, 'y1': 175, 'x2': 475, 'y2': 325, 'occupied': "offline" },
      //     { 'id': 13, 'x1': 500, 'y1': 175, 'x2': 600, 'y2': 325, 'occupied': "offline" },
      //     { 'id': 14, 'x1': 625, 'y1': 175, 'x2': 725, 'y2': 325, 'occupied': "offline" },
      //     { 'id': 15, 'x1': 750, 'y1': 175, 'x2': 850, 'y2': 325, 'occupied': "offline" },
      //     { 'id': 16, 'x1': 875, 'y1': 175, 'x2': 975, 'y2': 325, 'occupied': "offline" }
      // ];
      let mockParkingData = (await (await fetch(`https://${HOST}/api/sensor/mapslot?map=${MAP}&__order=id&__page_size=16&__range_header=true`)).json()).rows;
      setParkingSlots(mockParkingData);
    };
    fetchParkingData();
  }, []);
  useEffect(() => {
    const ws = new WebSocket(`wss://${HOST}/api/pubsub/subscribe`);
    ws.addEventListener("open", (event) => {
      ws.send(JSON.stringify({
        "request": {
          "method": "subscribe",
          "arguments": { "topics": [`${PLACE}/${LEVEL}`] },
        },
      }));
    });

    ws.addEventListener("message", (event) => {
      const update = JSON.parse(event.data);
      // Get the request from message
      const request = update.request;

      if (request) {
        // Create notification response with the call_id
        const notify = {
          response: {
            result: "None",
            result_type: "None",
            call_id: request.call_id
          }
        };
        ws.send(JSON.stringify(notify));
      }

      if (request !== null) {
        console.log('Received message:', update.request.arguments.data.map_slots);
        setParkingSlots(prevSlots => {
          const updatedSlots = prevSlots.map(slot => {
            const matchingSlot = update.request.arguments.data.map_slots.find(
              newSlot => newSlot.id === slot.id
            );

            if (matchingSlot) {
              return {
                ...slot,
                occupied: matchingSlot.occupied
              };
            }

            return slot;
          });

          return updatedSlots;

        })
      }
    });

    ws.addEventListener("close", (event) => {
      console.log('Connection closed');

      return () => {
        ws.close();
      }
    });
  }, []);

  const statusColors = {
    occupied: '#FFB6B3',  // red
    available: '#BDE7BD', // green
    offline: '#D3D3D3',   // grey
    default: '#D3D3D3'    // fallback white
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {parkingSlots.map(slot => (
          <div
            key={slot.id}
            className={styles.parkingSlot}
            style={{
              left: `${slot.x1}px`,
              top: `${slot.y2}px`,
              width: `${slot.x2 - slot.x1}px`,
              height: `${slot.y2 - slot.y1}px`,
              backgroundColor: statusColors[slot.occupied] || statusColors.default
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
