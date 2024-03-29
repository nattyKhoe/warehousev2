// https://github.com/hourmeng12/invoice-generator/

import React, { useEffect, useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
// import incrementString from '../../helpers/incrementString';
import styles from './styles.css';
import Dropdown from '../Dropdown/Dropdown';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

function InvoiceOutForm({user}){
    const [isOpen, setIsOpen] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [customerList, setCustomerList] = useState([]);
    const [customerName, setCustomerName] = useState({});
    const [subtotal, setSubtotal] = useState(1.00);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null);
    const [itemList, setItemList] = useState([]);
    const [items, setItems] = useState([
      {
        id: uid(6),
        name: '',
        item_id: '',
        price: '1.00',
        qty: 1,
      },
    ]);
    const [reset, setReset] = useState([false]);
  
    const reviewInvoiceHandler = (event) => {
      event.preventDefault();
      if (items[0].item_id && customerName.id) {
        setIsOpen(true);
      }

      if(!items[0].item_id){
          setError("Please Input the Item");
        }
      if(!customerName.id){
          setError("The store details are missing, please select a store")
        }
    
    };
  
    const addNextInvoiceHandler = async() => {
      const response = await fetch('/invoice_outs',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body:JSON.stringify({
          "invoice_number": invoiceNumber,
          "date": today,
          "store_id": customerName.id,
          "tax": tax,
          "total": subtotal,
          "discount": discount,
          "grand_total": total,
          "paid_status": false,
          "user_id": user.id
        })
      })
      .then(r=>r.json())
      .catch(error=>{
        setError(error.message);
      });

      // console.log(await data);
    for (const lineItem of items){
      let item = {
        quantity: lineItem.qty,
        price: lineItem.price,
        item_id: lineItem.item_id,
      }

      const response_line = await fetch(`/invoice_outs/${await response.id}/invoice_out_line_items`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      if (response_line.ok){
        setMessage('Invoice has been generated!')
      }
    }
      
    setReset(true);
     
    };
    
    const resetForm = () => {
      fetchInvoiceNo();
        setItems([
        {
          id: uid(6),
          name:'',
          item_id: '',
          qty: 1,
          price: '0',
        },
      ]);
        setCustomerName({});
        setIsOpen(false);
        setDiscount('');
        setTax('');
        setReset(false);
        setError('')
    }

    const addItemHandler = () => {
      const id = uid(6);
      setItems((prevItem) => [
        ...prevItem,
        {
          id: id,
          item_id: '',
          name: '',
          qty: 1,
          price: '1.00',
        },
      ]);
    };
  
    const deleteItemHandler = (id) => {
      setItems((prevItem) => prevItem.filter((item) => item.id !== id));
    };
  
    const editItemHandler = (id, item) => {
      let newItems = [...items]
      for (let i = 0; i < newItems.length ; i++){
        if (newItems[i].id === id){
          newItems[i] = item;
        }
      }
  
      setItems(newItems);
    };

    const fetchInvoiceNo = () =>{
      fetch('/invoice_outs_last',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
      .then(r =>{
        if (r.ok){
          r.json().then(data=>{
            setInvoiceNumber(data)});
        };
      });
    };

   useEffect(()=>{
    const timeId = setTimeout(()=>{
      setMessage(null)
    }, 5000)

    return ()=>{
      clearTimeout(timeId);
    }
   },[message])

  useEffect(()=>{
   const timeId = setTimeout(()=>{
    setError(null)
  }, 5000)

  return ()=>{
    clearTimeout(timeId);
  }
 },[error]);

    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;

    //Component did mount
    // dropdown list index first
    // get the stores list
    useEffect(()=>{
      //get store list
      fetch('/stores', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
      .then(r =>{
        if (r.ok) {
          r.json().then(data=>setCustomerList(data))
        }
      });
      //get the last invoice number
      fetchInvoiceNo();
      //get the Item List
      fetch('/items', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
      .then(r =>{
        if (r.ok) {
          r.json().then(data=>setItemList(data))
        }
      });
    },[])

    // component did update
    useEffect(()=>{
      setDiscount(customerName.discount)
    },[customerName])

    // setSubtotal everytime item changes;
    useEffect(()=>{
      let sub = 0;
      if (items.length > 0) {
        for (let i =0 ; i < items.length; i++){
          sub += items[i].price*items[i].qty
        }
      }
      setSubtotal(sub);
      
    }, [items])

    // setting reset

    useEffect(()=>{
      resetForm();
    }, [reset===true]);

    return(
    <form
      className="form"
      onSubmit={reviewInvoiceHandler}
    >
    <br/>
    <h1>New Invoice</h1>
    <div className='error centre'>{error}</div>
    <div className="alert centre">
      {message}
    </div>
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
            <span className='invoiceNo'>
            {invoiceNumber}
            </span>
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
          <label
            htmlFor="customerName"
            className="customer"
          >
            Store:
          </label>
          {reset === false && <Dropdown className="input" isSearchable placeHolder="select customer" options={customerList} selectedValue={customerName} setSelectedValue={setCustomerName} required/>}
          
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
            {reset===false && items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                itemList={itemList}
                // quantity={item.quantity}
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
            <span>${subtotal?subtotal.toFixed(2):0}</span>
          </div>
          <div className="subsummary">
            <span className="title">Discount:
            </span>
            <span>
                ({discount} %)  ${discountRate?discountRate.toFixed(2):0}
            </span>
          </div>
          <div className="subsummary">
            <span className="title">Tax:</span>
            <span>
            <input required
                  className="sub-input"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  max="50"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                  %
              ${taxRate?taxRate.toFixed(2):0}
            </span>
          </div>
          <div className="total">
            <span className="title">Total:</span>
            <span className="title">
              ${total ? total.toFixed(2): 0}
            </span>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="subfooter-1">
         
          {/* reviewed Invoice conditional */}
          {isOpen
          ?<InvoiceModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          invoiceInfo={{
            invoiceNumber,
            subtotal,
            taxRate,
            discountRate,
            total,
          }}
          customerName={customerName}
          cashierName={user}
          items={items}
          onAddNextInvoice={addNextInvoiceHandler}/>
          :null}
          
          <div className="subfooter-2">
          <button
            className="review_button"
            type="submit"
          >
            Review Invoice
          </button>
          </div>
        </div>
      </div>
    </form>
    )
}
export  default InvoiceOutForm;