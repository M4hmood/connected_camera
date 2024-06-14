import './dashboard.css'
import Sidebar from '../sidebar/sidebar';
import Video from '../video/video';
import Temperature from '../temperature/temperature';
import Humidity from '../humidity/humidity';
import FlameFluid from '../flame_fluid/flame_fluid';
import Motion from '../motion/motion';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Dashboard() {
  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
      <div>
        <h1>ESP32-CAM Dashboard</h1>
        <div className='dashboard'>
        <div className='left'>
          <div className='temperature_container'>
              <Temperature />
              <h2 style={{'font-size': '30px'}}>Temperature</h2>
          </div>
          <div className='humidity_container'>
            <Humidity />
            <h2 style={{'font-size': '30px'}} >Humidity</h2>
          </div>
          <div className='motion_container'>
            <Motion />
          </div>
          <div className='ff_container'>
            <FlameFluid />
          </div>
        </div>
        <div className='right'>
          <div className='arrows'><ArrowBackIosIcon className='icon'style={{color: 'aquamarine'}}/></div>
          <Video />
          <div className='arrows'><ArrowForwardIosIcon className='icon' style={{color: 'aquamarine'}}/></div>
        </div>
      </div>
    </div>
  </div>
  )
}
