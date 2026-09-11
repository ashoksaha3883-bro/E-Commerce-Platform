import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Truck,
  WalletCards,
} from "lucide-react";

import hero1 from "../assets/image/hero12.jpg";
import hero2 from "../assets/image/hero13.jpg";
import hero3 from "../assets/image/hero23.jpg";
import hero4 from "../assets/image/hero22.jpg";
import hero5 from "../assets/image/hero19.jpg";


const slides = [
  {
    image: hero1,
    title: "Discover Your Style",
    subtitle: "NEW COLLECTION",
    description:
      "Modern essentials designed to elevate your everyday wardrobe.",
  },
  {
    image: hero2,
    title: "Made For Every Day",
    subtitle: "ESSENTIAL COLLECTION",
    description:
      "Simple pieces, better style, and everyday comfort designed for you.",
  },
  {
    image: hero3,
    title: "Your New Season",
    subtitle: "2026 COLLECTION",
    description:
      "Discover the latest styles and find your perfect look with Injoy.",
  },
  {
    image: hero4,
    title: "Find Your Look",
    subtitle: "TRENDING NOW",
    description:
      "Explore pieces that match your style and personality.",
  },
  {
    image: hero5,
    title: "Style Without Limits",
    subtitle: "EXPLORE INJOY",
    description:
      "Build a wardrobe that feels completely your own.",
  },
];


const Home = () => {
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);


  const nextSlide = () => {
    setCurrent(
      (prev) => (prev + 1) % slides.length
    );
  };


  const previousSlide = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + slides.length) %
        slides.length
    );
  };


  return (
    <main className="w-full">

      {/* =====================================================
          HERO + BENEFITS
          DESKTOP: EVERYTHING FITS INSIDE ONE VIEWPORT
      ====================================================== */}

      <section
        className="
          flex
          min-h-[calc(100vh-72px)]
          w-full
          flex-col
          px-3
          py-3
          sm:px-4
          sm:py-4
          lg:px-20
          lg:py-4
        "
      >

        {/* =====================================================
            HERO SLIDER
        ====================================================== */}

        <div
          className="
            relative
            min-h-0
            flex-1
            overflow-hidden
            rounded-xl
            sm:rounded-2xl
          "
        >

          {/* ==================== IMAGES ==================== */}

          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`
                absolute
                inset-0
                transition-opacity
                duration-1000
                ${
                  index === current
                    ? "opacity-100"
                    : "opacity-0"
                }
              `}
            >

<img
                src={slide.image}
                alt={slide.title}
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                " />

              {/* Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/60
                  via-black/25
                  to-transparent
                "
              />

            </div>
          ))}


          {/* =====================================================
              HERO CONTENT
          ====================================================== */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
            "
          >

            <div
              className="
                max-w-2xl
                px-6
                text-white
                sm:px-10
                lg:px-14
                xl:px-20
              "
            >

              <p
                className="
                  mb-3
                  text-[9px]
                  font-medium
                  tracking-[0.3em]
                  text-white/80
                  sm:mb-4
                  sm:text-xs
                "
              >
                {slides[current].subtitle}
              </p>


              <h1
                className="
                  max-w-xl
                  text-3xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                {slides[current].title}
              </h1>


              <p
                className="
                  mt-4
                  max-w-md
                  text-xs
                  leading-relaxed
                  text-white/80
                  sm:mt-5
                  sm:text-sm
                  lg:text-base
                "
              >
                {slides[current].description}
              </p>


              <button
                type="button"
                className="
                  mt-5
                  inline-flex
                  items-center
                  justify-center
                  bg-white
                  px-5
                  py-2.5
                  text-[10px]
                  font-semibold
                  tracking-wide
                  text-gray-950
                  transition-all
                  duration-300
                  hover:bg-gray-950
                  hover:text-white
                  sm:mt-7
                  sm:px-7
                  sm:py-3
                  sm:text-xs
                "
              >
                SHOP NOW
              </button>

            </div>

          </div>


          {/* =====================================================
              SLIDE INDICATORS
          ====================================================== */}

          <div
            className="
              absolute
              bottom-5
              left-5
              flex
              items-center
              gap-2
              sm:left-8
              lg:left-12
            "
          >

            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`
                  h-[2px]
                  transition-all
                  duration-300
                  ${
                    index === current
                      ? "w-8 bg-white"
                      : "w-4 bg-white/40 hover:bg-white/70"
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}

          </div>


          {/* =====================================================
              SLIDE CONTROLS
          ====================================================== */}

          <div
            className="
              absolute
              bottom-4
              right-4
              flex
              gap-2
              sm:bottom-5
              sm:right-7
              lg:right-10
            "
          >

            <button
              type="button"
              onClick={previousSlide}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white
                hover:text-gray-950
                sm:h-10
                sm:w-10
              "
              aria-label="Previous slide"
            >
              <ArrowLeft
                size={17}
                strokeWidth={1.7}
              />
            </button>


            <button
              type="button"
              onClick={nextSlide}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white
                hover:text-gray-950
                sm:h-10
                sm:w-10
              "
              aria-label="Next slide"
            >
              <ArrowRight
                size={17}
                strokeWidth={1.7}
              />
            </button>

          </div>

        </div>


        {/* =====================================================
            BENEFITS / SERVICE BAR
        ====================================================== */}

        <div
          className="
            mt-3
            w-full
            shrink-0
            overflow-hidden
            bg-[#eefafa]
          "
        >

          <div
            className="
              grid
              grid-cols-3
              divide-x
              divide-gray-300/60
            "
          >

            {/* ==================== CASHBACK ==================== */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                px-2
                py-3
                sm:gap-3
                sm:py-4
                lg:gap-4
                lg:py-5
              "
            >

              <div
                className="
                  hidden
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-900/20
                  bg-white/60
                  sm:flex
                  lg:h-11
                  lg:w-11
                "
              >
                <WalletCards
                  size={22}
                  strokeWidth={1.7}
                />
              </div>


              <div>

                <h3
                  className="
                    text-[10px]
                    font-semibold
                    sm:text-xs
                    lg:text-sm
                  "
                >
                  10% Cashback
                </h3>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-gray-600
                    sm:text-[10px]
                    lg:text-xs
                  "
                >
                  on all app orders
                </p>

              </div>

            </div>


            {/* ==================== RETURNS ==================== */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                px-2
                py-3
                sm:gap-3
                sm:py-4
                lg:gap-4
                lg:py-5
              "
            >

              <div
                className="
                  hidden
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-900/20
                  bg-white/60
                  sm:flex
                  lg:h-11
                  lg:w-11
                "
              >
                <RotateCcw
                  size={21}
                  strokeWidth={1.7}
                />
              </div>


              <div>

                <h3
                  className="
                    text-[10px]
                    font-semibold
                    sm:text-xs
                    lg:text-sm
                  "
                >
                  30 Days Easy Returns
                </h3>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-gray-600
                    sm:text-[10px]
                    lg:text-xs
                  "
                >
                  & Exchanges
                </p>

              </div>

            </div>


            {/* ==================== SHIPPING ==================== */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                px-2
                py-3
                sm:gap-3
                sm:py-4
                lg:gap-4
                lg:py-5
              "
            >

              <div
                className="
                  hidden
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-900/20
                  bg-white/60
                  sm:flex
                  lg:h-11
                  lg:w-11
                "
              >
                <Truck
                  size={22}
                  strokeWidth={1.7}
                />
              </div>


              <div>

                <h3
                  className="
                    text-[10px]
                    font-semibold
                    sm:text-xs
                    lg:text-sm
                  "
                >
                  Free & Fast Shipping
                </h3>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-gray-600
                    sm:text-[10px]
                    lg:text-xs
                  "
                >
                  On orders over ₹999
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};


export default Home;