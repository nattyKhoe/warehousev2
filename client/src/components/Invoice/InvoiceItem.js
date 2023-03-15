import React, { useEffect, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import InvoiceField from './InvoiceField';

const InvoiceItem = ({ isItemFetched, value, id, itemList, onDeleteItem, onEditItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  // const [itemPrice, setItemPrice] = useState(null);
  // const [item, setItem] = useState('');
  const [selectedValue, setSelectedValue] = useState (
    isItemFetched? value : {}
  )
  const [quantity, setQuantity] = useState(
    isItemFetched? value.qty : 1
  );
  
  useEffect(()=>{
    onEditItem(id, 
      {
        id: id,
        name: selectedValue.name,
        item_id: selectedValue.id,
        item_code: selectedValue.item_code,
        price: selectedValue.price,
        qty: quantity
      }
    );
  }, [selectedValue, quantity])


  return (
    <tr>
      {console.log(value)}
      <td id="item-name">
        <Dropdown isSearchable placeHolder="select item" options={itemList} selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
      </td>
      <td id='item-qty'>
        <InvoiceField
          handleChange={(event) => setQuantity(event.target.value)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'quantity',
            id: id,
            value: quantity,
          }}
        />
      </td>
      <td id='item-price'>
        <span className='left' id={id}>
          $  {selectedValue.price}
        </span>
      </td>
      {isItemFetched
      ?null
      :(<td id='item-button'>
      <button
        id='delete-button'
        onClick={deleteItemHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="delete-img"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </td>)}
      
    </tr>
  );
};

export default InvoiceItem;