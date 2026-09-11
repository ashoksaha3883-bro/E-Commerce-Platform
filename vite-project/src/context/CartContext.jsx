import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // ===============================
  // ADD TO CART
  // ===============================

  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct = currentCart.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      // Product already exists
      if (existingProduct) {

        return currentCart.map((item) => {

          if (
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
          ) {
            return {
              ...item,
              quantity:
                item.quantity +
                (product.quantity || 1),
            };
          }

          return item;
        });
      }

      // New product
      return [
        ...currentCart,
        {
          ...product,
          id: product.id,
          quantity: product.quantity || 1,
          size: product.size || "M",
          color: product.color || "Default",
        },
      ];

    });

  };

  // ===============================
  // REMOVE FROM CART
  // ===============================

  const removeFromCart = (
    id,
    size,
    color
  ) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.color === color
          )
      )
    );

  };

  // ===============================
  // UPDATE QUANTITY
  // ===============================

  const updateQuantity = (
    id,
    size,
    color,
    quantity
  ) => {

    if (quantity <= 0) {

      removeFromCart(
        id,
        size,
        color
      );

      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => {

        if (
          item.id === id &&
          item.size === size &&
          item.color === color
        ) {
          return {
            ...item,
            quantity,
          };
        }

        return item;

      })
    );

  };

  // ===============================
  // CART COUNT
  // ===============================

  const cartCount = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }, [cart]);

  // ===============================
  // CART TOTAL
  // ===============================

  const cartTotal = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
        item.quantity,
      0
    );

  }, [cart]);

  // ===============================
  // PROVIDER
  // ===============================

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

