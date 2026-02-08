import './styles.css'
import Sidebar from '../sidebar/index';
import Temperature from '../temperature/index';
import Humidity from '../humidity/index';
import FlameFluid from '../flame_fluid/index';
import Motion from '../motion/index';
import WebCam from '../webCam/index';
/*
import Video from '../video/index';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';*/

export default function Dashboard() {
  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
      <div className='dashboard_container'>
        <h1>ESP32-CAM Dashboard</h1>
        <div className='dashboard'>
          <div className='left'>
            <div className='temperature_container'>
                <Temperature />
                <h2>Temperature</h2>
            </div>
            <div className='humidity_container'>
              <Humidity />
              <h2>Humidity</h2>
            </div>
            <div className='motion_container'>
              <Motion />
            </div>
            <div className='ff_container'>
              <FlameFluid />
            </div>
          </div>
          <div className='right'>
            <WebCam />
            {/*<div className='arrows'><ArrowBackIosIcon className='icon'style={{color: 'aquamarine'}}/></div>
            <Video /> 
            <div className='arrows'><ArrowForwardIosIcon className='icon' style={{color: 'aquamarine'}}/></div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}
