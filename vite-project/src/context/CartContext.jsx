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
      // Always use the actual product ID
      const productId = product.id || product._id;

      const productSize = product.size || product.sizes?.[0] || "M";
      const productColor =
        product.color || product.colors?.[0] || "Default";

      const existingProduct = currentCart.find(
        (item) =>
          item.id === productId &&
          item.size === productSize &&
          item.color === productColor
      );

      // Product already exists
      if (existingProduct) {
        return currentCart.map((item) => {
          if (
            item.id === productId &&
            item.size === productSize &&
            item.color === productColor
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

          // Store one consistent ID
          id: productId,

          quantity: product.quantity || 1,

          size: productSize,
          color: productColor,
        },
      ];
    });
  };

  // ===============================
  // REMOVE FROM CART
  // ===============================

  const removeFromCart = (id, size, color) => {
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
      removeFromCart(id, size, color);
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