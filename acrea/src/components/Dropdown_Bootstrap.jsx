import React from 'react'
import { Config } from '../config/Config'
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import Styles from "./css/Dropdown_Bootstrap.module.css"


function Dropdown_Bootstrap({ isDropdownOpen, closeFunc, dropdownDataArr = [], marginTop = "0px" }) {
  return (
    <div style={isDropdownOpen ? {
      position: "absolute",
      flexDirection: "column",
      zIndex: 1,
      backgroundColor: Config.color.background,
      boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      marginTop: marginTop,
      padding: ".6rem",
      borderRadius: "6px",
      minWidth: "10rem",
      cursor: "default"
    } : {
      display: "none"
    }}>
      <CancelIcon
        style={{
          width: "1.6rem",
          height: "1.6rem",
          objectFit: "contain",
          color: Config.color.textColor,
          alignSelf: "flex-end",
          margin: "0px",
          padding: "0px",
          cursor: "pointer"
        }}
        onClick={(e) => {
          e.stopPropagation();
          closeFunc();
        }}
      />
      {dropdownDataArr?.map((item, index) => {
        if (("customDom" in item) && item.customDom !== null) {
          return (item.customDom)
        } else {
          return (
            <Link key={index} to={item.navigate || ""} style={{ textDecoration: "none" }}>
              <p
                className={Styles.dropdownMenu}
                style={{
                  color: Config.color.textColor,
                  borderBottom: ".1px grey solid",
                }}

              >{item.title || ""}
              </p>
            </Link>
          )
        }
      })}

    </div>
  )
}

export default Dropdown_Bootstrap