import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

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
    {error
    ?(<h4>error</h4>)
    :null}
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Tax</th>
          <th>Discount</th>
          <th>Grand Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(invoice => (
          <tr key={invoice.id}>
            <td>{invoice.date}</td>
            <td>{invoice.invoice_number}</td>
            <td>{invoice.store_name}</td>
            <td>{invoice.total}</td>
            <td>{invoice.tax}</td>
            <td>{invoice.discount}</td>
            <td>{invoice.grand_total}</td>
            <td><Link to={`/invoice_outs/${invoice.id}/edit`}>View/Edit</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default InvoiceTable;
