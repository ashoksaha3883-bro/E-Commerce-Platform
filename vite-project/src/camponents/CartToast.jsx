import { X, Check, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const CartToast = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-top-4 duration-300">

      <div className="bg-white border border-gray-200 shadow-xl p-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
              <Check size={15} />
            </div>

            <p className="font-medium text-sm">
              Added to your bag
            </p>
          </div>

          <button
            onClick={hideToast}
            className="p-1 text-gray-400 hover:text-black"
          >
            <X size={18} />
          </button>

        </div>

        <div className="flex gap-3 mt-4">

          <img
            src={toast.image}
            alt={toast.name}
            className="w-16 h-20 object-cover bg-gray-100"
          />

          <div className="flex-1">
            <p className="text-sm font-medium">
              {toast.name}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {toast.color} / {toast.size}
            </p>

            <p className="text-sm mt-2">
              ₹{toast.price}
            </p>
          </div>

        </div>

        <Link
          to="/cart"
          onClick={hideToast}
          className="mt-4 w-full bg-black text-white py-3 text-sm font-medium flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} />
          View Shopping Bag
        </Link>

      </div>

    </div>
  );
};

export default CartToast;