import './video.css';
import { useState, useEffect } from 'react';

export default function Video() {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const ws = new WebSocket("ws://127.0.0.1:3001/jpgstream_client");
        ws.onmessage = (message) => {
            // Assuming message.data contains the image data as a Blob or ArrayBuffer
            const url = URL.createObjectURL(message.data);
            //console.log(url);
            setImageSrc(url);
        };

        return () => {
            ws.close(); // Close WebSocket connection when component unmounts
        };
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <div className="video_container">
            <img src={imageSrc} alt="Live Stream" style={{width: '100%', height: 'auto', 'border-radius': '10px'}}/>
        </div>
    );
}
