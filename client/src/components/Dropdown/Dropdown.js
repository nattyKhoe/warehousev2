import React, { useEffect, useState, useRef} from "react";

import "./styles.css";

function Icon() {
  return (
    <svg height="15" width="20" viewBox="0 2 15 25">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

function Dropdown({ placeHolder, options, selectedValue, setSelectedValue, isSearchable, isMulti}){
    const [showMenu, setShowMenu] = useState(false);
    const inputRef = useRef();

    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef();

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() =>{
      function handler(e){
        if (inputRef.current && !inputRef.current.contains(e.target)){
          setShowMenu(false);
        }
      }
      window.addEventListener("click", handler);
      return ()=>{
      window.removeEventListener("click", handler);
      };
  });

    function onSearch(e) {
      setSearchValue(e.target.value);
    } ;
    function getOptions(){
      if (!searchValue) {
          return options;
      }
      return options.filter((option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  };


    function handleInputClick(e){
        // e.stopPropagation();
        setShowMenu(!showMenu);
    }

    function getDisplay(){
        if(selectedValue){
            return selectedValue.name;
        } else {
        return placeHolder;
        };
    };

    function onItemClick(option){
        setSelectedValue(option);
    };

    function isSelected(option){
        if (!selectedValue){
            return false
        }

        return selectedValue.value === option.value;
    }

    // if (isMulti){
    //   setSelectedValue([])
    // }
  return (
    <div className="dropdown-container">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {isSearchable && (
            <div className="search-box">
            <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
            )}
          {getOptions().map((option) => (
            <div onClick={() => onItemClick(option)} key={option.name} className={`dropdown-item ${isSelected(option) && "selected"}`}>
            {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;