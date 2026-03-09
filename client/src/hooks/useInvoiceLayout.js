import { useRef, useState } from "react";

const useInvoiceLayout = () => {
  const [layout, setLayout] = useState({
    test: {
      x: 49,
      y: 40,
      width: 200,
      height: 50,
      defaultFontSize: 40,
    },
    companyName: {
      x: 566,
      y: 49,
      width: 200,
      height: 50,
      defaultFontSize: 18,
    },
    companyAdd: {
      x: 618,
      y: 76,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    companyMail: {
      x: 551,
      y: 101,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    billTo: {
      x: 46,
      y: 246,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    billName: {
      x: 48,
      y: 270,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    billDate: {
      x: 228,
      y: 246,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    billDate1: {
      x: 228,
      y: 270,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    invoiceNumber: {
      x: 410,
      y: 246,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    invoiceNumber1: {
      x: 408,
      y: 270,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    amountDue: {
      x: 590,
      y: 246,
      width: 150,
      height: 50,
      defaultFontSize: 16,
    },
    amountDue1: {
      x: 590,
      y: 269,
      width: 150,
      height: 50,
      defaultFontSize: 19,
    },
    line: {
      x: 50,
      y: 358,
      width: 694,
    },
    description: {
      x: 48,
      y: 392,
      width: 200,
      height: 50,
      defaultFontSize: 14,
    },
    rate: {
      x: 463,
      y: 392,
      width: 200,
      height: 50,
      defaultFontSize: 13,
    },
    qty: {
      x: 550,
      y: 392,
      width: 200,
      height: 50,
      defaultFontSize: 14,
    },
    amount: {
      x: 683,
      y: 392,
      width: 200,
      height: 50,
      defaultFontSize: 14,
    },
    table: {
      x: 48,
      y: 395,
      width: 700,
      height: 50,
    },
    subtotal: {
      x: 418,
      y: 0,
      width: 200,
      height: 50,
      defaultFontSize: 16,
    },
    subtotalAmount: {
      x: 647,
      y: 0,
      width: 200,
      height: 50,
      defaultFontSize: 16,
    },
    tax: {
      x: 418,
      y: 50,
      width: 200,
      height: 50,
      defaultFontSize: 16,
    },
    taxAmount: {
      x: 647,
      y: 50,
      width: 200,
      height: 50,
      defaultFontSize: 16,
    },
    border: {
      x: 418,
      y: 90,
      width: 300,
      height: 50,
    },
    total: {
      x: 418,
      y: 100,
      width: 200,
      height: 50,
      defaultFontSize: 16,
    },
    totalAmount: {
      x: 647,
      y: 100,
      width: 200,
      height: 50,
      defaultFontSize: 16,
    },
    notes: {
      x: 0,
      y: 150,
      width: 300,
      height: 50,
    },
  });

  /* ---------- REFS ---------- */
  const invoiceRef = useRef(null);
  const companyRef = useRef(null);
  const titleRef = useRef(null);
  const customerRef = useRef(null);
  const itemsRef = useRef(null);
  const totalRef = useRef(null);
  const notesRef = useRef(null);
  const dividerRef = useRef(null);
  const noreref = useRef(null);
  const testref = useRef(null);

  /* ---------- GET POSITION RELATIVE TO INVOICE ---------- */
  const getLayout = (ref) => {
    if (!invoiceRef.current || !ref.current) return null;

    const parentRect = invoiceRef.current.getBoundingClientRect();
    const rect = ref.current.getBoundingClientRect();

    return {
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  /* ---------- GET CHILD POSITION RELATIVE TO PARENT ---------- */
  const getLayoutRelativeToParent = (childRef, parentRef) => {
    if (!childRef.current || !parentRef.current) return null;

    const parentRect = parentRef.current.getBoundingClientRect();
    const rect = childRef.current.getBoundingClientRect();

    return {
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  /* ---------- CAPTURE LAYOUT ---------- */
  const captureLayout = () => {
    setLayout({
      company: {
        container: getLayout(companyRef),
        title: getLayoutRelativeToParent(titleRef, companyRef),
      },
      customer: getLayout(customerRef),
      items: getLayout(itemsRef),
      total: getLayout(totalRef),
      notes: getLayout(notesRef),
      divider: getLayout(dividerRef),
    });
  };

  return {
    layout,
    captureLayout,
    invoiceRef,
    companyRef,
    titleRef,
    customerRef,
    noreref,
    testref,
    itemsRef,
    totalRef,
    notesRef,
    dividerRef,
  };
};

export default useInvoiceLayout;
