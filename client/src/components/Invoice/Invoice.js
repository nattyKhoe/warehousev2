// https://github.com/hourmeng12/invoice-generator/

import React, { useEffect, useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../../helpers/incrementString';
import styles from './styles.css';
import Dropdown from '../Dropdown/Dropdown';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

function InvoiceInForm({user}){
    const [isOpen, setIsOpen] = useState(false);
    const [discount, setDiscount] = useState('');
    const [tax, setTax] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [customerName, setCustomerName] = useState({});
    // const [customerList, setCustomerList] = useState([]);
    // const [itemList, setItemList] = useState([]);
    const [items, setItems] = useState([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  
    const reviewInvoiceHandler = (event) => {
      event.preventDefault();
      setIsOpen(true);
    };
  
    const addNextInvoiceHandler = () => {
      setInvoiceNumber((prevNumber) => incrementString(prevNumber));
      setItems([
        {
          id: uid(6),
          name: '',
          qty: 1,
          price: '1.00',
        },
      ]);
    };
  
    const addItemHandler = () => {
      const id = uid(6);
      setItems((prevItem) => [
        ...prevItem,
        {
          id: id,
          name: '',
          qty: 1,
          price: '1.00',
        },
      ]);
    };
  
    const deleteItemHandler = (id) => {
      setItems((prevItem) => prevItem.filter((item) => item.id !== id));
    };
  
    const editItemHandler = (event) => {
      const editedItem = {
        id: event.target.id,
        name: event.target.name,
        value: event.target.value,
      };
  
      const newItems = items.map((items) => {
        for (const key in items) {
          if (key === editedItem.name && items.id === editedItem.id) {
            items[key] = editedItem.value;
          }
        }
        return items;
      });
  
      setItems(newItems);
    };
  
    const subtotal = items.reduce((prev, curr) => {
      if (curr.name.trim().length > 0)
        return prev + Number(curr.price * Math.floor(curr.qty));
      else return prev;
    }, 0);
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;
    // dropdown list index first
    // get the stores list
    // useEffect(()=>{
    //   fetch('/stores', {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json",
    //     }
    //   })
    //   .then(r =>{
    //     if (r.ok) {
    //       r.json().then(data=>setCustomerList(data))
    //     }
    //   })
    // })

    const customerList = [
      {
        tax_number:123542121,
        store_code:132416546,
        name: "one",
        id:1,
        discount: 0.1,
        plafond: 500000000,
        total_credit:1230000,
        address:"zsxdfcgvhbnjm",
        city:"sxdcfgvhbjnkm"
    },
    {
      tax_number:123542121,
      store_code:132416546,
      name: "two",
      id:2,
      discount: 0.1,
      plafond: 500000000,
      total_credit:1230000,
      address:"zsxdfcgvhbnjm",
      city:"sxdcfgvhbjnkm"
  }
    ]

    const itemList = [
    {
      item_code: "asdfgh",
      name: "sunflower",
      price: 2.99,
      buying_price: 1.99,
      stock: 100,
      category: "garden",
      manufacturer_id:1,
    },
    {
      item_code: "xdcfgvjhbk",
      name: "flower",
      price: 2.99,
      buying_price: 1.99,
      stock: 200,
      category: "garden",
      manufacturer_id:2,
    }
    ]

    return(
    <form
      className="form"
      onSubmit={reviewInvoiceHandler}
    >
    <div className="invoice">
        {/* header */}
        <div className="header">
          
          <div className="number">
            <span className="title">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="number">
            <label className="title" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="invoiceNo"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
            />
          </div>
        </div>
        <h1 className="centre title inv">INVOICE</h1>
        {/* Cashier Name and Store address */}
        <div className="details">
          <label
            htmlFor="cashierName"
            className="cashier"
          >
            Cashier:
          </label>
          <h4
            className="input"
            value={user.username}
          >
            {user.username}
          </h4>
          {/* <input
            className="input"
            placeholder={user.username}
            type="text"
            name="cashierName"
            id="cashierName"
            value={user.username}
          /> */}
          <label
            htmlFor="customerName"
            className="customer"
          >
            Store:
          </label>
          <Dropdown className="input" placeHolder="select customer" options={customerList} selectedValue={customerName} setSelectedValue={setCustomerName}/>
        </div>
        {/* Items */}
        <table className="table">
          <thead>
            <tr className="row">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="centre">PRICE</th>
              <th className="centre">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                itemList={itemList}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEditItem={editItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="add_button"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        {/* subtotal and total */}
        <div className="summary">
          <div className="subsummary">
            <span className="title">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="subsummary">
            <span className="title">Discount:</span>
            <span>
              ({discount || '0'}%)${discountRate.toFixed(2)}
            </span>
          </div>
          <div className="subsummary">
            <span className="title">Tax:</span>
            <span>
              ({tax || '0'}%)${taxRate.toFixed(2)}
            </span>
          </div>
          <div className="total">
            <span className="title">Total:</span>
            <span className="title">
              ${total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="subfooter-1">
          <button
            className="review_button"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              // cashierName,
              // customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            customerName={customerName}
            cashierName={user}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          <div className="subfooter-2">
            <div className="subsub">
              <label className="sub-label" htmlFor="tax">
                Tax rate:
              </label>
              <div className="sub-value">
                <input
                  className="sub-input"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                <span className="percent">
                  %
                </span>
              </div>
            </div>
            <div className="subsub">
              <label
                className="sub-label"
                htmlFor="discount"
              >
                Discount rate:
              </label>
              <div className="sub-value">
                <input
                  className="sub-input"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="percent">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    )
}
export  default InvoiceInForm;