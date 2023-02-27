import React from "react";
import Menu from "./Menu";
import { menuItems } from './menuitems.js';
import style from './styles.css'


function NavBar () {
    return (
    <nav>
      <ul className="menus">
        {/* account type conditioning here? ???or get separate menuitems for each acc_types */}
        {menuItems.map((menu, index) => {
          return <Menu items={menu} key={index} />;
          // if index >= ... check account type if true then proceed mapping.
        })}
      </ul>
    </nav>
    );
}

export default NavBar;