import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext.jsx";
import { getProducts } from "../services/productApi.js";

const Products = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error("Products Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:4000${image}`;
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (product) => {
    const size = product.sizes?.[0] || "M";
    const color = product.colors?.[0] || "Default";

    addToCart({
      ...product,
      id: product._id,
      size,
      color,
      quantity: 1,
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">

          {/* Header Skeleton */}

          <div className="mb-10 flex items-end justify-between">

            <div>
              <div className="h-3 w-32 animate-pulse bg-gray-100" />

              <div className="mt-4 h-10 w-48 animate-pulse bg-gray-100 sm:h-12 sm:w-64" />
            </div>

            <div className="hidden h-4 w-20 animate-pulse bg-gray-100 sm:block" />

          </div>

          {/* Product Skeleton */}

          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div key={item}>

                <div className="aspect-[3/4] animate-pulse bg-gray-100" />

                <div className="mt-4 h-3 w-20 animate-pulse bg-gray-100" />

                <div className="mt-2 h-4 w-32 animate-pulse bg-gray-100" />

                <div className="mt-3 h-4 w-16 animate-pulse bg-gray-100" />

              </div>
            ))}

          </div>

        </div>
      </section>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-0">

      <div className="mx-auto max-w-[1400px]">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mb-10 sm:mb-12 lg:mb-14">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            {/* Left */}

            <div>

              <div className="mb-4 flex items-center gap-3">

                <span className="h-px w-8 bg-gray-950" />

                <p className="text-[10px] font-semibold tracking-[0.28em] text-gray-500 sm:text-xs">
                  THE LATEST
                </p>

              </div>

              <h2
                className="
                  text-3xl
                  font-semibold
                  leading-[1]
                  tracking-[-0.04em]
                  text-gray-950
                  sm:text-4xl
                  lg:text-[46px]
                "
              >
                New Arrivals
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
                Discover the latest pieces selected for
                your everyday wardrobe.
              </p>

            </div>

            {/* View All */}

            <Link
              to="/new-collection"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                border-b
                border-gray-950
                pb-1.5
                text-xs
                font-medium
                tracking-[0.05em]
                text-gray-950
                transition-colors
                hover:text-gray-500
                sm:mb-1
              "
            >
              VIEW ALL

              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>

          </div>

          {/* Header Line */}

          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-4">

            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
              {Math.min(products.length, 8)}{" "}
              {products.length === 1 ? "STYLE" : "STYLES"}
            </p>

            <p className="hidden text-[10px] font-medium tracking-[0.18em] text-gray-300 sm:block">
              INJOY / 2026
            </p>

          </div>

        </div>

        {/* =================================================
            PRODUCTS GRID
        ================================================= */}

        {products.length > 0 && (

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

            {products.slice(0, 8).map((product, index) => (

              <article
                key={product._id}
                className="group min-w-0"
              >

                {/* =================================================
                    IMAGE
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
                      src={getImageUrl(product.image)}
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
                        rounded-lg
                      "
                    />

                    {/* Subtle Overlay */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/15
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
                        text-white
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-80
                        sm:right-4
                        sm:top-4
                      "
                    >
                      0{index + 1}
                    </span>

                    {/* View Icon */}

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
                    PRODUCT INFO
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

                        <h3
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
                        </h3>

                      </div>

                      <ArrowUpRight
                        size={14}
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
                      text-[10px]
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

        {products.length === 0 && (

          <div className="border-y border-gray-200 py-20 text-center">

            <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400">
              NEW ARRIVALS
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-gray-950">
              Products coming soon.
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              We're preparing the latest Injoy collection.
              Please check back soon.
            </p>

          </div>

        )}

        {/* =================================================
            BOTTOM LINK
        ================================================= */}

        {products.length > 8 && (

          <div className="mt-12 flex justify-center border-t border-gray-200 pt-8">

            <Link
              to="/new-collection"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                tracking-[0.1em]
                text-gray-950
              "
            >

              EXPLORE ALL PRODUCTS

              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />

            </Link>

          </div>

        )}

      </div>

    </section>
  );
};

export default Products;