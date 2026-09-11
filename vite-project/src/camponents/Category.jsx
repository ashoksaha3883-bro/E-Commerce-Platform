import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import womenImage from "../assets/image/hero30.jpg";
import menImage from "../assets/image/images (62).jpg";
import kidsImage from "../assets/image/hero31.jpg";
import trendingImage from "../assets/image/hero32.jpg";

const categories = [
  {
    id: 1,
    name: "Women",
    subtitle: "New styles for every occasion",
    image: womenImage,
    link: "/women",
  },
  {
    id: 2,
    name: "Men",
    subtitle: "Everyday essentials, elevated",
    image: menImage,
    link: "/men",
  },
  {
    id: 3,
    name: "Kids",
    subtitle: "Comfort and style for every day",
    image: kidsImage,
    link: "/kids",
  },
  {
    id: 4,
    name: "Trending",
    subtitle: "The styles everyone is loving",
    image: trendingImage,
    link: "/new-collection",
  },
];

const Category = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">

        {/* LEFT CONTENT */}

        <div>
          <div className="mb-4 flex items-center gap-3">

            <span className="h-px w-8 bg-gray-950" />

            <p className="text-[10px] font-semibold tracking-[0.28em] text-gray-500 sm:text-xs">
              EXPLORE COLLECTIONS
            </p>

          </div>

          <h2 className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-gray-950 sm:text-4xl lg:text-5xl">
            Find your style.
            <br />
            Make it your own.
          </h2>
        </div>

        {/* RIGHT CONTENT */}

        <div className="max-w-md lg:pb-1">
          <p className="text-sm leading-7 text-gray-500 sm:text-[15px]">
            Explore carefully selected collections made for
            different styles, personalities, and everyday moments.
          </p>
        </div>

      </div>

      {/* =====================================================
          CATEGORY GRID
      ===================================================== */}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={category.link}
            className="
              group
              relative
              block
              h-[250px]
              overflow-hidden
              rounded-3xl
              bg-gray-100
              sm:h-[390px]
              lg:h-[460px]
              xl:h-[450px]
            "
          >

            {/* =================================================
                IMAGE
            ================================================= */}

            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              className="
                absolute
                inset-0
                h-full
                w-full
                rounded-3xl
                object-cover
                object-center
                transition-transform
                duration-[1000ms]
                ease-out
                group-hover:scale-[1.06]
              "
            />

            {/* =================================================
                IMAGE OVERLAY
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                rounded-3xl
                bg-gradient-to-t
                from-black/75
                via-black/15
                to-black/5
                transition-all
                duration-500
                group-hover:from-black/85
                group-hover:via-black/25
              "
            />

            {/* =================================================
                TOP INFORMATION
            ================================================= */}

            <div
              className="
                absolute
                left-5
                right-5
                top-5
                flex
                items-start
                justify-between
                sm:left-6
                sm:right-6
                sm:top-6
              "
            >

              {/* COLLECTION */}

              <div className="flex items-center gap-2">

                {/* Fixed invisible dot */}
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />

                <span className="text-[9px] font-medium tracking-[0.2em] text-white/75 sm:text-[10px]">
                  COLLECTION
                </span>

              </div>

              {/* NUMBER */}

              <span className="text-[10px] font-medium tracking-[0.18em] text-white/60">
                0{index + 1}
              </span>

            </div>

            {/* =================================================
                BOTTOM CONTENT
            ================================================= */}

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">

              {/* CATEGORY NAME + ARROW */}

              <div className="flex items-end justify-between gap-3">

                <div>

                  <h3
                    className="
                      text-2xl
                      font-semibold
                      tracking-[-0.025em]
                      text-white
                      sm:text-3xl
                      lg:text-[34px]
                    "
                  >
                    {category.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-[210px]
                      text-[11px]
                      leading-5
                      text-white/70
                      sm:text-xs
                      sm:leading-6
                    "
                  >
                    {category.subtitle}
                  </p>

                </div>

                {/* =================================================
                    ARROW BUTTON
                ================================================= */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
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
                    sm:h-11
                    sm:w-11
                  "
                >
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.7}
                  />
                </div>

              </div>

              {/* =================================================
                  BOTTOM LINE
              ================================================= */}

              <div className="mt-5 h-px w-full bg-white/20">

                <div
                  className="
                    h-full
                    w-0
                    bg-white
                    transition-all
                    duration-700
                    ease-out
                    group-hover:w-full
                  "
                />

              </div>

            </div>

          </Link>
        ))}

      </div>

      {/* =====================================================
          BOTTOM DESCRIPTION
      ===================================================== */}

      <div
        className="
          mt-8
          flex
          items-center
          justify-between
          border-t
          border-gray-200
          pt-6
          sm:mt-10
        "
      >

        <p className="text-xs text-gray-400">
          Four collections. One style.
        </p>

        <Link
          to="/new-collection"
          className="
            group
            flex
            items-center
            gap-2
            text-xs
            font-medium
            text-gray-950
          "
        >
          View all collections

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

    </section>
  );
};

export default Category;