//import './flame.css';
import React, {useState, useEffect} from 'react';
import mqtt from 'mqtt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export default function Flame() {
  const [flameDetected, setFlameDetected] = useState(false);
  const [fluidDetected, setFluidDetected] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);

  useEffect(() => {
      const client = mqtt.connect('mqtt://127.0.0.1:1883');

      client.on('connect', function () {
          console.log('Connected to MQTT broker');
          client.subscribe('flame');
          client.subscribe('fluid');
      });

      client.on('message', function (topic, message) {
        console.log(`Received message on topic ${topic}: ${message.toString()}`);
        if (topic === 'flame') {
            if (message.toString() === 'detected') {
                setFlameDetected(true);
                setAlarmActive(true);
            } else {
                setFlameDetected(false);
            }
        } else if (topic === 'fluid') {
            if (message.toString() === 'detected') {
                setFluidDetected(true);
                setAlarmActive(true);
            } else {
                setFluidDetected(false);
            }
        }

      });
      return () => {
          client.end();
      };
  }, []); 
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '500px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='data'>
            <h2>Flame detection</h2>
            <p style={{ color: flameDetected ? 'orange' : 'gray' }}>{flameDetected ? 'Flame detected' : 'No flame detected'} <LocalFireDepartmentIcon style={{ color: flameDetected ? 'orange' : 'gray', transform: 'translatey(5px)' }} /></p>
          </div>
          <div className='data'>
            <h2>Fluid detection</h2>
            <p style={{ color: fluidDetected ? 'yellow' : 'gray' }}>{fluidDetected ? 'Fluid detected' : 'No fluid detected'} <WaterDropIcon style={{ color: fluidDetected ? 'yellow' : 'gray', transform: 'translatey(5px)' }} /></p>
          </div>
      </div>
      <ReportGmailerrorredIcon style={{ fontSize: '50px', color: alarmActive ? 'red' : 'gray' }} />
    </div>
  )
}
