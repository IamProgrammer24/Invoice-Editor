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
