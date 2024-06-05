import React from 'react';
import { IoLogoFacebook, IoLogoInstagram } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa';
import { RiLinkedinBoxFill } from 'react-icons/ri';
import './TeamCard.css';

export default function TeamCard({imgSrc, title, subtitle, description, footer }) {
    return (
        <div className="box card">
           <img alt="profile" src={imgSrc}/>
            <h2 >{title}</h2>
            <h4>{subtitle}</h4>
            <h5>{description}</h5>
            <h6>{footer}</h6>
            <div class="icons">
                <IoLogoFacebook className="icon"
                    color={'aquamarine'}
                    title={'Facebook'}
                    height="30px"
                    width="30px"
                />
                <FaTwitter className="icon"
                    color={'aquamarine'}
                    title={'Twitter'}
                    height="30px"
                    width="30px"
                />
                <IoLogoInstagram className="icon"
                     
                    color={'aquamarine'}
                    title={'Instagram'}
                    height="30px"
                    width="30px"
                />
                <RiLinkedinBoxFill className="icon"
                    color={'aquamarine'}
                    title={'Linkedin'}
                    height="30px"
                    width="30px"
                />
            </div>
        </div>
    );
}