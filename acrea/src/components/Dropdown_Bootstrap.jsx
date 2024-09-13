import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

function Dropdown_Bootstrap({ isDropdownOpen }) {
  return (
    <Dropdown show={isDropdownOpen}>
      <Dropdown.Menu id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item >Action</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Dropdown_Bootstrap