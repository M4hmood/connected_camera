import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import GaugeComponent from 'react-gauge-component';

export default function Humidity() {
    const [humidity, setHumidity] = useState(0);
    
    useEffect(() => {
        const client = mqtt.connect('mqtt://127.0.0.1:1883');

        client.on('connect', function () {
            console.log('Connected to MQTT broker');
            client.subscribe('humidity');
        });

        client.on('message', function (topic, message) {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);
            if (topic === 'humidity') {
                setHumidity(parseFloat(message.toString()));
            }

        });

        return () => {
            client.end(); // Clean up MQTT client on unmount
        };
    }, []);
  return (
    <GaugeComponent
        arc={{
            subArcs: [
            {
                limit: 20,
                color: 'rgb(176 211 228)',
                showTick: true
            },
            {
                limit: 40,
                color: 'rgb(25 206 245)',
                showTick: true
            },
            {
                limit: 60,
                color: 'rgb(25 135 245)',
                showTick: true
            },
            {
                limit: 100,
                color: 'rgb(20 82 218)',
                showTick: true
            },
            ]
        }}
        value={humidity}
        />
        )
}
