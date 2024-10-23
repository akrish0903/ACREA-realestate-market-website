import React from 'react'
import { Config } from '../../config/Config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/NoPageFound.module.css'
import { NavLink } from 'react-router-dom';

function NoPageFound() {
  return (
    <div className={`screen ${Styles.screenNoPage}`}>
      <Header/>
         <img src={Config.imagesPaths.error404} style={{width:'35rem', height:'35rem',marginLeft:'30rem'}}/>
         <h2 style={{marginLeft:'35rem',marginBottom:'1rem'}}>Please Go Back To 
          <NavLink to={'/'} 
            style={{ textDecoration:'none',
              borderRadius:'1rem',
              marginLeft:'1rem',
            }}>
          Home Page</NavLink>
          </h2>
      <Footer/>
    </div>
  )
}

export default NoPageFound