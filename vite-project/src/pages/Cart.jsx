import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  // ===============================
  // IMAGE URL
  // ===============================

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:4000${image}`;
  };

  // ===============================
  // CHECKOUT
  // ===============================

  const handleCheckout = () => {
    alert("Your products have been successfully submitted.");
  };

  // ===============================
  // EMPTY CART
  // ===============================

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-3xl font-semibold">
            Your Bag Is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Discover something you love and add it to your bag.
          </p>

          <Link
            to="/"
            className="
              mt-7
              inline-block
              bg-black
              px-7
              py-3
              text-sm
              text-white
              transition
              hover:bg-gray-800
            "
          >
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-14 lg:px-10">

      {/* ===============================
          PAGE TITLE
      =============================== */}

      <h1 className="text-3xl font-semibold md:text-4xl">
        Your Shopping Bag
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">

        {/* ===============================
            CART PRODUCTS
        =============================== */}

        <div>

          {cart.map((item) => (

            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="
                flex
                gap-5
                border-b
                border-gray-200
                py-6
              "
            >

              {/* ===============================
                  PRODUCT IMAGE
              =============================== */}

              <Link
                to={`/product/${item.id}`}
                className="shrink-0"
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="
                    h-36
                    w-28
                    bg-gray-100
                    object-cover
                    transition
                    hover:opacity-90
                  "
                />
              </Link>

              {/* ===============================
                  PRODUCT INFORMATION
              =============================== */}

              <div className="flex-1">

                <div className="flex justify-between gap-4">

                  <div>

                    <p className="text-xs text-gray-500">
                      {item.category}
                    </p>

                    <Link
                      to={`/product/${item.id}`}
                      className="
                        mt-1
                        block
                        font-medium
                        hover:underline
                      "
                    >
                      {item.name}
                    </Link>

                    <p className="mt-2 text-sm text-gray-500">
                      Color: {item.color || "Default"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Size: {item.size || "M"}
                    </p>

                  </div>

                  {/* Product Total */}

                  <p className="font-medium">
                    ₹{item.price * item.quantity}
                  </p>

                </div>

                {/* ===============================
                    QUANTITY + REMOVE
                =============================== */}

                <div className="mt-6 flex items-center justify-between">

                  {/* Quantity */}

                  <div className="flex items-center border border-gray-200">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        transition
                        hover:bg-gray-100
                      "
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-9 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        transition
                        hover:bg-gray-100
                      "
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>

                  </div>

                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.size,
                        item.color
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-gray-500
                      transition
                      hover:text-red-600
                    "
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ===============================
            ORDER SUMMARY
        =============================== */}

        <div
          className="
            h-fit
            bg-gray-50
            p-7
            lg:sticky
            lg:top-8
          "
        >

          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-7 space-y-4 text-sm">

            {/* Subtotal */}

            <div className="flex justify-between">

              <span className="text-gray-500">
                Subtotal
              </span>

              <span>
                ₹{cartTotal}
              </span>

            </div>

            {/* Shipping */}

            <div className="flex justify-between">

              <span className="text-gray-500">
                Shipping
              </span>

              <span>
                Free
              </span>

            </div>

          </div>

          {/* Total */}

          <div className="mt-6 border-t border-gray-200 pt-6">

            <div className="flex justify-between font-medium">

              <span>
                Total
              </span>

              <span>
                ₹{cartTotal}
              </span>

            </div>

          </div>

          {/* Checkout */}

          <button
            type="button"
            onClick={handleCheckout}
            className="
              mt-7
              w-full
              bg-black
              py-4
              text-sm
              font-medium
              text-white
              transition
              hover:bg-gray-800
              active:scale-[0.99]
            "
          >
            Proceed to Checkout
          </button>

          {/* Continue Shopping */}

          <Link
            to="/"
            className="
              mt-5
              block
              text-center
              text-sm
              underline
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
};

export default Cart;

