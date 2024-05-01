import React, {useState, useEffect} from 'react';
import mqtt from 'mqtt';
import { LinearGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';


export default function Temperature() {
    const [pointerValue, setPointerValue ] = useState(0);

    useEffect(() => {
        const brokerUrl = "wss://3efe6d8d8deb46a79cf3fced831f468b.s1.eu.hivemq.cloud:8884/mqtt";
        const options = {
            clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
            username: 'M4hmoud',
            password: 'Boumaiza03',
        };
        const client = mqtt.connect(brokerUrl, options);

        client.on('connect', function () {
            console.log('Connected to MQTT broker');
            client.subscribe('temperature'); 
        });

        client.on('message', function (topic, message) {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);
            console.log(message);
            if (topic === 'temperature') {
                setPointerValue(parseFloat(message.toString()));
            }
        });
        return () => {
            client.end();
        };
    }, []); 

  return (
    <LinearGaugeComponent className='temperature_gauge'>
        <AxesDirective>
            <AxisDirective line={{ height: 250, width: 7, color: '#4286f4' }} labelStyle={{ format: '{value}°C' }}>
                <PointersDirective>
                    <PointerDirective value={pointerValue} style={{transition: "transform 0.5s ease"}} ></PointerDirective>
                </PointersDirective>
                <RangesDirective>
                    <RangeDirective start={70} end={100}></RangeDirective>
                    <RangeDirective start={40} end={70}></RangeDirective>
                    <RangeDirective start={20} end={40}></RangeDirective>
                    <RangeDirective start={0} end={20}></RangeDirective> 
                </RangesDirective>
            </AxisDirective>
        </AxesDirective>
        <p style={{"font-size": "x-large", color: 'aquamarine'}}>{pointerValue}°C</p>
    </LinearGaugeComponent>
  )
}
