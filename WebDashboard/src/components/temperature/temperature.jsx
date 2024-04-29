import React, {useState, useEffect} from 'react';
import mqtt from 'mqtt';
import { LinearGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';


export default function Temperature() {
    const [pointerValue, setPointerValue ] = useState(0);

    useEffect(() => {
        const client = mqtt.connect('mqtt://127.0.0.1:1883');

        client.on('connect', function () {
            console.log('Connected to MQTT broker');
            client.subscribe('temperature'); 
        });

        client.on('message', function (topic, message) {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);
            if (topic === 'temperature') {
                // Update humidity state when receiving a message for humidity
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
                    <RangeDirective start={50} end={80}></RangeDirective>
                    <RangeDirective start={30} end={50}></RangeDirective>
                    <RangeDirective start={0} end={30}></RangeDirective> 
                </RangesDirective>
            </AxisDirective>
        </AxesDirective>
        <p style={{"font-size": "x-large", color: 'aquamarine'}}>{pointerValue}°C</p>
    </LinearGaugeComponent>
  )
}
