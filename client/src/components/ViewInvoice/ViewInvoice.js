import React, { useEffect, useState } from 'react';
import InvoiceItem from '../Invoice/InvoiceItem';
import InvoiceModal from '../Invoice/InvoiceModal';
import Loading from '../Loading/Loading'
import styles from './styles.css';
import Dropdown from '../Dropdown/Dropdown';
import { useParams } from 'react-router-dom';

function ViewInvoice({user}){
    const [discount, setDiscount] = useState(0);
    const [date, setDate] = useState('');
    const [tax, setTax] = useState(0);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [customerList, setCustomerList] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [subtotal, setSubtotal] = useState(1.00);
    const [items, setItems] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [error, setError]= useState('');
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const {id} = useParams();
    useEffect(()=>{
        fetch(`/invoice_outs/${id}`)
        .then((res)=>{
            if (res.ok){
                res.json().then(data=>{
                    setDate(data.date)
                    setCustomerName(data.store);
                    setInvoiceNumber(data.invoice_number);
                    setDiscount(data.discount);
                    setTax(data.tax);
                    setItems(data.invoice_out_line_items.map((item) =>(
                      {
                        id: item.id,
                        qty: item.quantity,
                        price: item.price,
                        name: item.name,
                        item_id: item.item_id
                      })
                    ));
                })
            }
        })
        .catch(err=>{
          setError(err)
        })
        .finally(()=>setIsLoading(false));

        // get store list
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
    }, []);
  
    const reviewInvoiceHandler = () => {
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

    const preventSubmit =e =>{
      e.preventDefault()
    }
  
    const saveUpdateInvoiceHandler = async() => {
      const response = await fetch(`/invoice_outs/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body:JSON.stringify({
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

    for (const lineItem of items){
      let item = {
        quantity: lineItem.qty,
        // price: lineItem.price,
        // item_id: lineItem.item_id,
      }
      console.log(item);

      const response_line = await fetch(`/invoice_outs/${id}/invoice_out_line_items/${lineItem.id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      if (response_line.ok){
        setMessage('Invoice has been updated!')
      }
    }
      setIsEditing(false)    
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

    const handleEdit = () => {
      if (isEditing) {
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    }

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


    // setSubtotal everytime item changes;
    useEffect(()=>{
      let sub = 0;
      if (items.length > 0) {
        for (let i =0 ; i < items.length; i++){
          sub += items[i].price*items[i].qty
        }
      }
      setSubtotal(sub);
      
    }, [items]);

    if (isLoading){
      return <Loading/>
    }

    return(
    <form
      className='form'
      onSubmit={preventSubmit}
    >
    <br/>
    <h1>Edit Invoice</h1>
    <div className='error centre'>{error}</div>
    <div className='alert centre'>
      {message}
    </div>
    <div className="invoice">
        {/* header */}
        <div className="header">
          
          <div className="number">
            <span className="title">Invoice Date: </span>
            <span>{date}</span>
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
        <h4 className='input'>
            {customerName.name}
          </h4>
        </div>
        {/* Items */}
        <table className="table">
          <thead>
            <tr className="row">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="centre">PRICE</th>
            </tr>
          </thead>
          <tbody>
            { isEditing 
              ?items.map((item) => (
                <InvoiceItem
                  isItemFetched
                  key={item.id}
                  id={item.id}
                  itemList={itemList}
                  value={{
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    qty: item.qty,
                  }}
                  onEditItem={editItemHandler}
                />
              ))
              :items.map((item=>(
                <tr>
                <td id="item-name">{item.name}</td>
                <td id="item-quantity">{item.qty}</td>
                <td id="item-price">${item.price}</td>
                {/* <td id="item-button"><button>edit</button></td> */}
                </tr>
              )))
            }
          </tbody>
        </table>
       
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

          <div className="subfooter-2">
            {isEditing
            ? (<button
                className="review_button"
                type="submit"
                onClick={reviewInvoiceHandler}
              >
                Review Invoice
              </button>)
            : ( <button
                className='review_button'
                onClick={handleEdit}
                >
                  Edit
                </button>)
            }
          {isOpen && isEditing
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
          onAddNextInvoice={saveUpdateInvoiceHandler}/>
          :null}

          </div>
        </div>
      </div>
    </form>
    ); 
}
export  default ViewInvoice;