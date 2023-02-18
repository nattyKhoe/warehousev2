import styles from './styles.css';
import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';


function Invoice () {
    return (
    <Document>
    <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <InvoiceTitle title='Invoice'/>
        <InvoiceNo invoice={invoice}/>
        <BillTo invoice={invoice}/>
        <InvoiceItemsTable invoice={invoice} />
        <InvoiceThankYouMsg />
    </Page>
    </Document>
    );
    }
export default Invoice
