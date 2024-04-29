import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const Motion = () => {
    const [motionDetected, setMotionDetected] = useState(false);

    useEffect(() => {
        const client = mqtt.connect('mqtt://127.0.0.1:1883');

        client.on('connect', function () {
            console.log('Connected to MQTT broker');
            client.subscribe('motion');
        });

        client.on('message', function (topic, message) {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);
            if (topic === 'motion') {
                // Assuming message.toString() returns '1' for motion detected and '0' for no motion
                setMotionDetected(message.toString() === '1');
            }
        });

        return () => {
            client.end();
        };
    }, []);

    return (
        <div style={{display: 'flex', 'flex-direction': 'column', 'align-items': 'center', width: '300px'}}>
          <h2 style={{'font-size': '30px'}}>Motion detection</h2>
          <div style={{display: 'flex', width: '300px', 'justify-content': 'space-evenly', 'align-items': 'center'}}>
            <p style={{ fontSize: '20px', color: motionDetected ? 'blue': 'gray'}}>{motionDetected ? 'Motion Detected' : 'No Motion Detected'}</p>
            {motionDetected ? <DirectionsRunIcon style={{color: 'blue'}}/> : <AccessibilityIcon style={{color: 'red'}}/>}
          </div>
        </div>
    );
};

export default Motion;
