import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Dropdown from '../Dropdown/Dropdown';
import styles from './styles.css';


function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [unfilteredInvoices, setUnfilteredInvoices] = useState([])
  const [error, setError]= useState('');
  const [isLoading, setIsLoading]= useState(true);
  const [filter, setFilter] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  function cancelFilter (){
    setFilter(null);
    // setIsFiltering(false);
  }

  useEffect(() => {
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
    fetch('/invoice_outs')
      .then(response => response.json())
      .then(data => {
        setInvoices(data);
        setUnfilteredInvoices(data)})
      .catch(err => setError(err))
      .finally(()=>setIsLoading(false))
  }, []);

  useEffect(()=>{
    if (filter){
      setIsFiltering(true);
      setInvoices(unfilteredInvoices.filter((invoice) => invoice.store_name === filter.name));
    } else {
      setIsFiltering(false);
      setInvoices(unfilteredInvoices)
    }
  }, [filter])

  if (isLoading){
    return <Loading/>
  }
  return (
    <div>
    <br/>
    <h1>Invoices Table</h1>
    {error
    ?(<h4>error</h4>)
    :null}
    <div className="details">
    <label
            htmlFor="cashierName"
            className="cashier"
          >
          </label>
          <h4
            className="input"
          >
          </h4>
      <label
        htmlFor="customerName"
        className="customer"
      >
      Store:
      </label>
      <Dropdown className="input" isSearchable placeHolder="All Customer" options={customerList} selectedValue={filter} setSelectedValue={setFilter} required/>
      {isFiltering?<button className='input' onClick={cancelFilter}>Cancel</button>:null}
      </div>
      <br/>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>ID</th>
          <th>Customer</th>
          <th></th>
          <th>Total</th>
          <th></th>
          <th>Tax</th>
          <th>Discount</th>
          <th></th>
          <th>Grand Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(invoice => (
          <tr key={invoice.id}>
            <td className='date'>{invoice.date}</td>
            <td className='invoice_no'>{invoice.invoice_number}</td>
            <td className='store'>{invoice.store_name}</td>
            <td className='dollar'>$</td>
            <td className='number'>{(Math.round(invoice.total*100)/100).toFixed(2)}</td>
            <td className='dollar'>$</td>
            <td className='number'>{(Math.round(invoice.tax*100)/100).toFixed(2)}</td>
            <td className='discount'>{invoice.discount} %</td>
            <td className='dollar'>$</td>
            <td className='number'>{(Math.round(invoice.grand_total*100)/100).toFixed(2)}</td>
            <td className='link'><Link to={`/invoice_outs/${invoice.id}/edit`}>View/Edit</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default InvoiceTable;
