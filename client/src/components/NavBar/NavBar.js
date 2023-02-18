import React from "react";
import Menu from "./Menu";
import { menuItems } from './menuitems.js';
import style from './styles.css'


function NavBar () {
    return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <Menu items={menu} key={index} />;
        })}
      </ul>
    </nav>
    );
}

export default NavBar;