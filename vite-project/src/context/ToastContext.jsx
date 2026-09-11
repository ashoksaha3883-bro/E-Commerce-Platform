import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (product) => {
    setToast(product);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};