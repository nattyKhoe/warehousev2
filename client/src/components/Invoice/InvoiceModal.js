import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
  customerName,
  cashierName
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById('print');
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = 'annoymous';
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [5.5, 8.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        id='dialog'
        onClose={closeModal}
      >
        <div className="transition">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="dialog-overlay" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="span"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="invoice-container">
              <div className="invoice-sub-container" id="print">
                <h1 className="invoice-title">
                  INVOICE
                </h1>
                <div className="invoice-sub-info">
                    <span className="title">Invoice Number:</span>
                    <span>{invoiceInfo.invoiceNumber}</span>
                    <span className="title">Cashier:</span>
                    <span>{cashierName.username}</span>
                    <span className="title">Customer:</span>
                    <span>{customerName.name}</span>
                  </div>                
                <div className="invoice-info">
                  <div className="invoice-sub-info">
                    <span className="title">Invoice Number:</span>
                    <span>{invoiceInfo.invoiceNumber}</span>
                    <span className="title">Cashier:</span>
                    <span>{cashierName.username}</span>
                    <span className="title">Customer:</span>
                    <span>{customerName.name}</span>
                  </div>

                  <table className="wide left">
                    <thead>
                      <tr className="invoice-row">
                        <th>ITEM</th>
                        <th className="centre">QTY</th>
                        <th className="right">PRICE</th>
                        <th className="right">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="wide">{item.name}</td>
                          <td className="m50 centre">
                            {item.qty}
                          </td>
                          <td className="m80 right">
                            ${Number(item.price).toFixed(2)}
                          </td>
                          <td className="m90 right">
                            ${Number(item.price * item.qty).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="invoice-footer">
                    <div className="invoice-subfooter1">
                      <span className="title">Subtotal:</span>
                      <span>${invoiceInfo.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="invoice-subfooter2">
                      <span className="title">Discount:</span>
                      <span>${invoiceInfo.discountRate.toFixed(2)}</span>
                    </div>
                    <div className="invoice-subfooter2">
                      <span className="title">Tax:</span>
                      <span>${invoiceInfo.taxRate.toFixed(2)}</span>
                    </div>
                    <div className="invoice-subfooter1">
                      <span className="title">Total:</span>
                      <span className="title">
                        $
                        {invoiceInfo.total % 1 === 0
                          ? invoiceInfo.total
                          : invoiceInfo.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-buttons">
                <button
                  className="invoice-button"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button>
                <button
                  onClick={addNextInvoiceHandler}
                  className="invoice-button"
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg> */}
                  <span>Exit</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;