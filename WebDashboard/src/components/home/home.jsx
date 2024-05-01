import React from 'react';
import TeamCard from '../TeamCard/TeamCard';
import './home.css';

export default function Home() {
    return (
        <div className='home_container'>
            <div className="header">
                <div className="description">
                    <h2>Description</h2>
                    <p>Our project combines the convenience of live-streaming surveillance with real-time environmental monitoring and threat detection. Using a connected camera, our system provides a web dashboard that streams live video feed while also displaying essential environmental data such as temperature, humidity, and gas levels. Additionally, our system incorporates advanced sensors for detecting potential hazards including flames and motion. With this comprehensive solution, users can remotely monitor their surroundings, ensuring both security and peace of mind.</p>
                </div>
            </div>
            <div className="container">
                <h3>Reach Our Team</h3>
                <h1>Contact Us</h1>
                <div className="row">
                    <TeamCard 
                        imgSrc="/images/adam.jpg"
                        title="Mohamed Adam Jemal" 
                        subtitle="Founder" 
                        description="Adam is a computer engineering student" 
                        footer="Contact: mohamed.adam.jemal@gmail.com" 
                    />
                    <TeamCard 
                       imgSrc="/images/mahmoud.jpg"
                       title="Mahmoud Yassine Boumaiza" 
                       subtitle="MERN Stack Developer" 
                       description="Mahmoud is a full stack developer, he is passionate about coding and technology." 
                       footer="Contact: boumaiza.yassin03@gmail.com"
                    />
                    <TeamCard
                        imgSrc="/images/belha.jpg"
                        title="Belhassen Ben Salem" 
                        subtitle="UI/UX Designer" 
                        description="belha is a UI/UX Designer" 
                        footer="Contact: belhassenbensalem@gmail.com"
                     />
                    
                </div>
                    
    
    
             </div>
    
        </div>
       
    
    
    
    );
}