import { useRef, useState } from "react";

const useInvoiceLayout = () => {
  const [layout, setLayout] = useState({});

  /* ---------- REFS ---------- */
  const invoiceRef = useRef(null);
  const companyRef = useRef(null);
  const titleRef = useRef(null);
  const customerRef = useRef(null);
  const itemsRef = useRef(null);
  const totalRef = useRef(null);
  const notesRef = useRef(null);
  const dividerRef = useRef(null);

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
    itemsRef,
    totalRef,
    notesRef,
    dividerRef,
  };
};

export default useInvoiceLayout;
