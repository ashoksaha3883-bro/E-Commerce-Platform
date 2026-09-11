import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext.jsx";
import { getProducts } from "../services/productApi.js";

const API_URL = "http://localhost:4000";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ============================================================
  // FETCH PRODUCT
  // ============================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        const foundProduct = data.find(
          (item) => String(item._id) === String(id)
        );

        if (!foundProduct) {
          setError("Product Not Found");
          return;
        }

        setProduct(foundProduct);

        // Default size
        if (foundProduct.sizes?.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        } else {
          setSelectedSize("M");
        }

        // Default color
        if (foundProduct.colors?.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        } else {
          setSelectedColor("Default");
        }
      } catch (err) {
        console.error("Product Details Error:", err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ============================================================
  // PRODUCT IMAGES
  // ============================================================

  const productImages = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }

    if (product.image) {
      return [product.image];
    }

    return [];
  }, [product]);

  const getImageUrl = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
  };

  // ============================================================
  // IMAGE CONTROLS
  // ============================================================

  const nextImage = () => {
    if (productImages.length <= 1) return;

    setSelectedImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    if (productImages.length <= 1) return;

    setSelectedImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  // ============================================================
  // QUANTITY
  // ============================================================

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      product,
      selectedSize || "M",
      selectedColor || "Default",
      quantity
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

          <p className="mt-4 text-sm text-gray-500">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !product) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-gray-400">
            INJOY
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            The product you're looking for may no longer be
            available.
          </p>

          <Link
            to="/"
            className="
              mt-7
              inline-flex
              items-center
              justify-center
              bg-black
              px-7
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-gray-800
            "
          >
            Back to Shopping
          </Link>
        </div>
      </main>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <main className="bg-white">
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-80px)]
          max-w-[1500px]
          flex-col
          px-4
          py-4
          sm:px-6
          lg:h-[calc(100vh-80px)]
          lg:flex-row
          lg:gap-8
          lg:overflow-hidden
          lg:px-8
          lg:py-6
          xl:gap-12
          xl:px-10
        "
      >
        {/* =====================================================
            LEFT SIDE - PRODUCT GALLERY
        ====================================================== */}

        <section
          className="
            flex
            min-h-0
            w-full
            flex-col
            lg:w-[58%]
            xl:w-[60%]
          "
        >
          {/* Back */}
          <Link
            to="/"
            className="
              mb-4
              inline-flex
              w-fit
              items-center
              gap-2
              text-xs
              font-medium
              text-gray-500
              transition
              hover:text-black
            "
          >
            <ArrowLeft size={15} />

            Back to shopping
          </Link>

          <div
            className="
              flex
              min-h-0
              flex-1
              gap-3
              rounded-2xl
              bg-[#f6f6f4]
              p-3
              sm:gap-4
              sm:p-4
              lg:p-5
            "
          >
            {/* -------------------------------------------------
                THUMBNAILS
            -------------------------------------------------- */}

            {productImages.length > 1 && (
              <div
                className="
                  hidden
                  w-[68px]
                  shrink-0
                  flex-col
                  gap-3
                  overflow-hidden
                  sm:flex
                "
              >
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`
                      relative
                      h-[76px]
                      w-[68px]
                      shrink-0
                      overflow-hidden
                      rounded-lg
                      bg-white
                      transition
                      ${
                        selectedImage === index
                          ? "ring-1 ring-black"
                          : "opacity-65 hover:opacity-100"
                      }
                    `}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${product.name} ${index + 1}`}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  </button>
                ))}
              </div>
            )}

            {/* -------------------------------------------------
                MAIN IMAGE
            -------------------------------------------------- */}

            <div
              className="
                relative
                min-h-[420px]
                flex-1
                overflow-hidden
                rounded-xl
                bg-white
                lg:min-h-0
              "
            >
              {productImages.length > 0 ? (
                <img
                  src={getImageUrl(
                    productImages[selectedImage]
                  )}
                  alt={product.name}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-contain
                    p-4
                    transition-transform
                    duration-500
                    sm:p-6
                    lg:p-8
                  "
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No image available
                </div>
              )}

              {/* Previous */}
              {productImages.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  className="
                    absolute
                    left-4
                    top-1/2
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white/90
                    text-gray-700
                    shadow-sm
                    backdrop-blur
                    transition
                    hover:bg-black
                    hover:text-white
                  "
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Next */}
              {productImages.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="
                    absolute
                    right-4
                    top-1/2
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white/90
                    text-gray-700
                    shadow-sm
                    backdrop-blur
                    transition
                    hover:bg-black
                    hover:text-white
                  "
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              )}

              {/* Image Counter */}
              {productImages.length > 1 && (
                <div
                  className="
                    absolute
                    bottom-4
                    left-1/2
                    -translate-x-1/2
                    rounded-full
                    bg-black/70
                    px-3
                    py-1
                    text-[10px]
                    font-medium
                    text-white
                    backdrop-blur
                  "
                >
                  {selectedImage + 1} / {productImages.length}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE - PRODUCT INFORMATION
        ====================================================== */}

        <section
          className="
            flex
            w-full
            flex-col
            pt-6
            lg:min-h-0
            lg:w-[42%]
            lg:justify-center
            lg:overflow-y-auto
            lg:pt-0
            xl:w-[40%]
          "
        >
          <div className="max-w-xl">
            {/* Category */}
            <p
              className="
                text-xs
                font-medium
                tracking-[0.18em]
                text-gray-400
              "
            >
              {product.category || "INJOY COLLECTION"}
            </p>

            {/* Product Name */}
            <h1
              className="
                mt-2
                text-2xl
                font-semibold
                leading-tight
                tracking-tight
                sm:text-3xl
                xl:text-4xl
              "
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    fill="currentColor"
                    className="text-black"
                  />
                ))}
              </div>

              <span className="text-xs text-gray-400">
                4.8 · 24 reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-center gap-3">
              <p className="text-2xl font-semibold">
                ₹{product.price}
              </p>

              {product.oldPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{product.oldPrice}
                </p>
              )}

              {product.oldPrice && product.price && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
                  SALE
                </span>
              )}
            </div>

            {/* Description */}
            <p
              className="
                mt-4
                max-w-lg
                text-sm
                leading-relaxed
                text-gray-500
              "
            >
              {product.description ||
                "A carefully designed piece made for comfortable everyday style. Simple, versatile and easy to wear."}
            </p>

            {/* Divider */}
            <div className="my-5 h-px bg-gray-100" />

            {/* =================================================
                COLOR
            ================================================== */}

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  Color
                </p>

                <span className="text-xs text-gray-500">
                  {selectedColor}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(product.colors?.length
                  ? product.colors
                  : ["Default"]
                ).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`
                      rounded-full
                      border
                      px-4
                      py-2
                      text-xs
                      transition
                      ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-600 hover:border-black"
                      }
                    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                SIZE
            ================================================== */}

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  Select Size
                </p>

                <button
                  type="button"
                  className="
                    text-xs
                    text-gray-500
                    underline
                    underline-offset-4
                    hover:text-black
                  "
                >
                  Size Guide
                </button>
              </div>

              <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                {(product.sizes?.length
                  ? product.sizes
                  : ["XS", "S", "M", "L", "XL"]
                ).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`
                      flex
                      h-10
                      items-center
                      justify-center
                      rounded-md
                      border
                      text-xs
                      font-medium
                      transition
                      ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-black"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                QUANTITY + ADD TO BAG
            ================================================== */}

            <div className="mt-6 flex gap-3">
              {/* Quantity */}
              <div
                className="
                  flex
                  h-12
                  shrink-0
                  items-center
                  rounded-md
                  border
                  border-gray-200
                "
              >
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="
                    flex
                    h-full
                    w-10
                    items-center
                    justify-center
                    text-gray-500
                    transition
                    hover:text-black
                  "
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="w-8 text-center text-sm font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="
                    flex
                    h-full
                    w-10
                    items-center
                    justify-center
                    text-gray-500
                    transition
                    hover:text-black
                  "
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add To Bag */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="
                  flex
                  h-12
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  bg-black
                  px-5
                  text-sm
                  font-medium
                  text-white
                  transition
                  duration-300
                  hover:bg-gray-800
                  active:scale-[0.99]
                "
              >
                <ShoppingBag size={17} />

                Add to Bag
              </button>
            </div>

            {/* =================================================
                SERVICE INFORMATION
            ================================================== */}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div
                className="
                  rounded-lg
                  border
                  border-gray-100
                  bg-gray-50
                  p-3
                "
              >
                <div className="flex items-center gap-2">
                  <Truck size={16} />

                  <p className="text-xs font-medium">
                    Free Shipping
                  </p>
                </div>

                <p className="mt-1 text-[10px] text-gray-500">
                  On orders over ₹999
                </p>
              </div>

              <div
                className="
                  rounded-lg
                  border
                  border-gray-100
                  bg-gray-50
                  p-3
                "
              >
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} />

                  <p className="text-xs font-medium">
                    Easy Returns
                  </p>
                </div>

                <p className="mt-1 text-[10px] text-gray-500">
                  30 day return policy
                </p>
              </div>
            </div>

            {/* =================================================
                AVAILABILITY
            ================================================== */}

            <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                <Check size={12} />
              </span>

              In stock and ready to ship
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;