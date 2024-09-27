import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/About.module.css";
import { Config } from '../../config/Config';

function About (){
  return (
    <div className={`screen ${Styles.aboutScreen}`}>
        <Header/>
        <div className={Styles.card1}>
        <div className={Styles.aboutpage}>
      <h1 style={{color:Config.color.primaryColor900}}>About Acera</h1>
      <p><strong>Acera: Your Pathway to Perfect Properties</strong></p>
      <p>
        Welcome to Acera, a comprehensive platform built with React and Node.js, designed to streamline property transactions 
        and interactions between Real Estate Agents, Normal Users, and Architects.
      </p>

      <h2 style={{color:Config.color.primaryColor900}}>Features</h2>
      <ul>
        <li>Property Management for Real Estate Agents</li>
        <li>Bidding system for property buyers</li>
        <li>360-degree Virtual Tours for remote property exploration</li>
        <li>Real-time communication with agents and architects</li>
        <li>User ratings and reviews for properties, agents, and architects</li>
        <li>Architects can manage portfolios and collaborate on property designs</li>
        <li>Admins oversee users, properties, and platform statistics</li>
      </ul>

      <h2 style={{color:Config.color.primaryColor900}}>Our Mission</h2>
      <p>
        At Acera, our mission is to provide a seamless and efficient experience for all stakeholders in the real estate market, 
        ensuring that property transactions are easy and transparent for everyone involved.
      </p>

      <h2 style={{color:Config.color.primaryColor900}}>Contact Us</h2>
      <p>
        If you have any questions or need assistance, feel free to contact our support team at support@acera.com.
      </p>
      </div>
      </div>
    <Footer/>
    </div>
  );
}

export default About;
