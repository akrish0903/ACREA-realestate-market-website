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
      Welcome to <strong>Acera</strong>, the pioneering Real Estate Marketplace that's transforming the way properties are bought, sold, and managed. Built with cutting-edge React and Node.js technology,
       Acera streamlines property transactions and fosters seamless interactions among Real Estate Agents, Property Owners, and Users.
      </p>
      <p>
      Our intuitive platform empowers stakeholders with robust tools to succeed in the dynamic real estate landscape. From effortless property listings and management to scheduled
       visits and predictive price analytics, Acera connects the dots with innovative features that make property transactions transparent, efficient, and stress-free.
       </p>
       <p style={{color:Config.color.primaryColor900, font:'1rem bolder'}}>Experience the future of real estate with Acera. Buy, sell, manage, and thrive withconfidence.
      </p>

      <h2 style={{color:Config.color.primaryColor900}}>What We Offer</h2>
      <ul>
        <li><strong>For Admins</strong>: Manage users, properties, FAQs, and gain insights with an analytics dashboard. Use our property price prediction tool to stay ahead of market trends.</li>
        <li><strong>For Real Estate Agents</strong>: Create and manage property listings, respond to user inquiries, and schedule appointments with potential buyers.</li>
        <li><strong>For Property Owners</strong>: List and manage properties, schedule property viewings, and set competitive prices with prediction tools.</li>
        <li><strong>For Normal Users</strong>: Search, filter, and bid on properties, take virtual tours, add properties to your wishlist, and communicate with agents.</li>
      </ul>

      <h2 style={{color:Config.color.primaryColor900}}>Our Mission</h2>
      <p>
      At Acera, our mission is to empower every stakeholder in the real estate market with advanced tools, seamless communication, and data-driven insights.
       We aim to simplify property transactions while ensuring transparency and accessibility for all.
      </p>

      <h2 style={{color:Config.color.primaryColor900}}>Contact Us</h2>
      <p>
        If you have any questions or need assistance, feel free to contact our support team at <i style={{color: 'blue'}}>acrea.real.estate.marketplace@gmail.com</i>.
      </p>
      </div>
      </div>
    <Footer/>
    </div>
  );
}

export default About;
