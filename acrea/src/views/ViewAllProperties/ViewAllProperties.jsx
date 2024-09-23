import React from 'react'
import Header from '../../components/Header'
import Styles from "./css/ViewAllProperties.module.css"
import { useLocation } from 'react-router-dom';
import SecondHeader from '../../components/SecondHeader';
import PropertiesCardVertical from '../../components/PropertiesCardVertical';

function ViewAllProperties() {
    
    return (
        <div className={`screen ${Styles.viewAllScreen}`}>
            <Header />
            <SecondHeader/>
            <div className={Styles.viewAllScreenContainer}>
                <PropertiesCardVertical/>
                <PropertiesCardVertical/>
                <PropertiesCardVertical/>
                <PropertiesCardVertical/>
                <PropertiesCardVertical/>
                <PropertiesCardVertical/>
                <PropertiesCardVertical/>
                <PropertiesCardVertical/>
                

            </div>
        </div>
    )
}

export default ViewAllProperties