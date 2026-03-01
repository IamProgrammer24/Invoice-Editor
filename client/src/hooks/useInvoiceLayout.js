import { useRef, useState } from "react";

const useInvoiceLayout = () => {
  const [layout, setLayout] = useState({});

  /* ---------- REFS ---------- */
  const invoiceRef = useRef(null);

  const companyRef = useRef(null);
  const customerRef = useRef(null);
  const itemsRef = useRef(null);
  const totalRef = useRef(null);
  const notesRef = useRef(null);
  const dividerRef = useRef(null);

  /* ---------- GET POSITION ---------- */
  const getLayout = (ref) => {
    const parentRect = invoiceRef.current.getBoundingClientRect();

    const rect = ref.current.getBoundingClientRect();

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
      company: getLayout(companyRef),
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
    customerRef,
    itemsRef,
    totalRef,
    notesRef,
    dividerRef,
  };
};

export default useInvoiceLayout;
