// https://github.com/hourmeng12/invoice-generator/

import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../../helpers/incrementString';
import styles from './styles.css';
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
    const [cashierName, setCashierName] = useState('');
    const [customerName, setCustomerName] = useState('');
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
          <input
            className="input"
            placeholder={user.username}
            type="text"
            name="cashierName"
            id="cashierName"
            value={user.username}
          />
          <label
            htmlFor="customerName"
            className="customer"
          >
            Customer:
          </label>
          <input
            required
            className="input"
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
          />
        </div>
        {/* Items */}
        <table className="table">
          <thead>
            <tr className="row">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="text-center">PRICE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
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
              cashierName,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
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