import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext.jsx";
import { getProducts } from "../services/productApi.js";

const ProductPage = ({ title, category, collection }) => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error("Product API Error:", error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = products.filter((product) => {
    if (category) {
      return product.category === category;
    }

    if (collection) {
      return product.collection === collection;
    }

    return true;
  });

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (product) => {
    const size = product.sizes?.[0] || "M";
    const color = product.colors?.[0] || "Default";

    addToCart(product, size, color, 1);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-white">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">

          <div className="mb-10">
            <div className="h-3 w-28 animate-pulse bg-gray-100" />

            <div className="mt-5 h-12 w-64 animate-pulse bg-gray-100 sm:h-16 sm:w-96" />

            <div className="mt-5 h-4 w-72 animate-pulse bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item}>

                <div className="aspect-[3/4] animate-pulse bg-gray-100" />

                <div className="mt-4 h-3 w-20 animate-pulse bg-gray-100" />

                <div className="mt-2 h-4 w-32 animate-pulse bg-gray-100" />

                <div className="mt-3 h-4 w-16 animate-pulse bg-gray-100" />

              </div>
            ))}

          </div>

        </div>

      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">

        <div className="max-w-md text-center">

          <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400">
            SOMETHING WENT WRONG
          </p>

          <h1 className="mt-4 text-2xl font-semibold">
            Unable to load products
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            We couldn't load the collection right now.
            Please try again.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="
              mt-7
              inline-flex
              items-center
              justify-center
              border
              border-gray-950
              bg-gray-950
              px-7
              py-3
              text-xs
              font-medium
              tracking-wide
              text-white
              transition
              duration-300
              hover:bg-white
              hover:text-gray-950
            "
          >
            TRY AGAIN
          </button>

        </div>

      </main>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-white">

      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="mb-12 sm:mb-14 lg:mb-16">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            {/* Left Content */}

            <div>

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-8 bg-gray-950" />

                <p className="text-[10px] font-semibold tracking-[0.28em] text-gray-500 sm:text-xs">
                  INJOY COLLECTION
                </p>

              </div>

              <h1
                className="
                  max-w-3xl
                  text-4xl
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.04em]
                  text-gray-950
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {title}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-[15px]">
                Explore carefully selected styles designed
                for modern everyday living.
              </p>

            </div>

            {/* Right Information */}

            <div className="lg:max-w-xs lg:text-right">

              <p className="text-xs leading-6 text-gray-400">
                Discover timeless essentials,
                contemporary pieces, and styles
                made to fit your everyday wardrobe.
              </p>

            </div>

          </div>

          {/* Header Bottom */}

          <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-5">

            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "Product"
                : "Products"}
            </p>

            <p className="hidden text-[10px] font-medium tracking-[0.18em] text-gray-400 sm:block">
              EXPLORE INJOY
            </p>

          </div>

        </header>

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        {filteredProducts.length > 0 && (

          <div
            className="
              grid
              grid-cols-2
              gap-x-3
              gap-y-10
              sm:gap-x-5
              sm:gap-y-12
              md:grid-cols-3
              lg:grid-cols-4
              lg:gap-x-6
              lg:gap-y-14
            "
          >

            {filteredProducts.map((product, index) => (

              <article
                key={product._id}
                className="group min-w-0"
              >

                {/* =================================================
                    PRODUCT IMAGE
                ================================================= */}

                <Link
                  to={`/product/${product._id}`}
                  className="block"
                >

                  <div
                    className="
                      relative
                      aspect-[3/4]
                      overflow-hidden
                      bg-gray-100
                    "
                  >

                    <img
                      src={
                        product.image?.startsWith("http")
                          ? product.image
                          : `http://localhost:4000${product.image}`
                      }
                      alt={product.name}
                      loading={index < 4 ? "eager" : "lazy"}
                      className="
                        h-full
                        w-full
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.045]
                      "
                    />

                    {/* Image Overlay */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/10
                        via-transparent
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* NEW Badge */}

                    {product.collection === "New Collection" && (
                      <span
                        className="
                          absolute
                          left-3
                          top-3
                          bg-white
                          px-2.5
                          py-1.5
                          text-[9px]
                          font-semibold
                          tracking-[0.14em]
                          text-gray-950
                          sm:left-4
                          sm:top-4
                        "
                      >
                        NEW
                      </span>
                    )}

                    {/* Product Number */}

                    <span
                      className="
                        absolute
                        right-3
                        top-3
                        text-[9px]
                        font-medium
                        tracking-[0.15em]
                        text-white/80
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                        sm:right-4
                        sm:top-4
                      "
                    >
                      0{index + 1}
                    </span>

                    {/* View Product */}

                    <div
                      className="
                        absolute
                        bottom-3
                        right-3
                        flex
                        h-10
                        w-10
                        translate-y-3
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-gray-950
                        opacity-0
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        sm:bottom-4
                        sm:right-4
                      "
                    >
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.7}
                      />
                    </div>

                  </div>

                </Link>

                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <div className="pt-4">

                  <Link
                    to={`/product/${product._id}`}
                    className="block"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-gray-400 sm:text-[10px]">
                          {product.category}
                        </p>

                        <h2
                          className="
                            mt-1.5
                            truncate
                            text-sm
                            font-medium
                            tracking-[-0.01em]
                            text-gray-950
                            transition-colors
                            duration-200
                            group-hover:text-gray-600
                            sm:text-[15px]
                          "
                        >
                          {product.name}
                        </h2>

                      </div>

                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.6}
                        className="
                          mt-1
                          shrink-0
                          text-gray-300
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-gray-950
                        "
                      />

                    </div>

                    {/* Price */}

                    <div className="mt-2.5 flex items-center gap-2">

                      <p className="text-sm font-medium text-gray-950">
                        ₹{product.price}
                      </p>

                      {product.oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{product.oldPrice}
                        </p>
                      )}

                    </div>

                  </Link>

                  {/* =================================================
                      ADD TO BAG
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      border
                      border-gray-200
                      bg-white
                      py-3
                      text-[11px]
                      font-semibold
                      tracking-[0.08em]
                      text-gray-950
                      transition-all
                      duration-300
                      hover:border-gray-950
                      hover:bg-gray-950
                      hover:text-white
                      active:scale-[0.98]
                      sm:py-3.5
                    "
                  >

                    <ShoppingBag
                      size={15}
                      strokeWidth={1.7}
                    />

                    ADD TO BAG

                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {filteredProducts.length === 0 && (

          <div className="border-y border-gray-200 py-24 text-center">

            <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400">
              COLLECTION
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-gray-950">
              Nothing here yet.
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              We're preparing something new.
              Check back soon for the latest Injoy styles.
            </p>

            <Link
              to="/"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                border-b
                border-gray-950
                pb-1
                text-xs
                font-medium
                text-gray-950
              "
            >
              BACK TO SHOPPING

              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
              />

            </Link>

          </div>

        )}

      </div>

    </main>
  );
};

export default ProductPage;