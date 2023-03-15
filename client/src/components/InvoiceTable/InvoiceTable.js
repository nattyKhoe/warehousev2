import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import styles from './styles.css'

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError]= useState('');
  const [isLoading, setIsLoading]= useState(true)

  useEffect(() => {
    fetch('/invoice_outs')
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(err => setError(err))
      .finally(()=>setIsLoading(false))
  }, []);

  if (isLoading){
    return <Loading/>
  }
  return (
    <>
    <br/>
    <h1>Invoices Table</h1>
    {error
    ?(<h4>error</h4>)
    :null}
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
    </>
  );
}

export default InvoiceTable;
