import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const Motion = () => {
    const [motionDetected, setMotionDetected] = useState(false);

    useEffect(() => {
        const brokerUrl = "wss://3efe6d8d8deb46a79cf3fced831f468b.s1.eu.hivemq.cloud:8884/mqtt";
        const options = {
            clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`, //unique client ID
            username: 'M4hmoud',
            password: 'Boumaiza03',
        };
        const client = mqtt.connect(brokerUrl, options);

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
          <div style={{display: 'flex', width: '300px', 'justify-content': 'space-evenly', 'align-items': 'flex-start'}}>
            <p style={{ fontSize: '20px', color: motionDetected ? 'blue': 'gray'}}>{motionDetected ? 'Motion Detected' : 'No Motion Detected'}</p>
            {motionDetected ? <DirectionsRunIcon style={{color: 'aquamarine'}}/> : <AccessibilityIcon style={{color: 'aquamarine'}}/>}
          </div>
        </div>
    );
};

export default Motion;
