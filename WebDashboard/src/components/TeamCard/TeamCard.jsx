import React from 'react';
import { LogoFacebook, LogoTwitter, LogoInstagram, LogoLinkedin } from 'react-ionicons'
import './TeamCard.css';

export default function TeamCard({imgSrc, title, subtitle, description, footer }) {
    return (
        <div class="box card">
           <img alt="profile" src={imgSrc}/>
            <h2 >{title}</h2>
            <h4>{subtitle}</h4>
            <h5>{description}</h5>
            <h6>{footer}</h6>
            <div class="icons">
                <LogoFacebook className="icon"
                    color={'aquamarine'}
                    title={'Facebook'}
                    height="30px"
                    width="30px"
                />
                <LogoTwitter className="icon"
                    color={'aquamarine'}
                    title={'Twitter'}
                    height="30px"
                    width="30px"
                />
                <LogoInstagram className="icon"
                     
                    color={'aquamarine'}
                    title={'Instagram'}
                    height="30px"
                    width="30px"
                />
                <LogoLinkedin className="icon"
                    color={'aquamarine'}
                    title={'Linkedin'}
                    height="30px"
                    width="30px"
                />
            </div>
        </div>
    );
}