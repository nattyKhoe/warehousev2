

import React, { useState, useEffect } from 'react';

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch('/invoices')
      .then(response => response.json())
      .then(data => setInvoices(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(invoice => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.customer}</td>
            <td>{invoice.total}</td>
            <td>{invoice.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvoiceTable;
