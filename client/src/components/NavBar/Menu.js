import React,  {useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import style from './styles.css'

function Menu ({items}) {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
         if (dropdown && ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
         }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
        };
       }, [dropdown]);

    return (
        <li className="menu-items" ref={ref}>
        {items.submenu ? (
          <>
            <button type="button" aria-haspopup="menu"
             aria-expanded={dropdown ? "true" : "false"}
             onClick={() => setDropdown((prev) => !prev)}>
              {items.title}{' '}
            </button>
            <Dropdown submenus={items.submenu} dropdown={dropdown}/>
          </>
        ) : (
          <a href={items.url}>{items.title}</a>
        )}
      </li>
      );
};

export default Menu;