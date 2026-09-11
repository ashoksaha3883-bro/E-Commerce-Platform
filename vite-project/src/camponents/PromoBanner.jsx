import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import bannerImage from "../assets/image/hero35.jpg";


const PromoBanner = () => {

  return (

    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">


      {/* ==================== PROMO BANNER ==================== */}

      <div
        className="
          group
          relative
          h-[420px]
          overflow-hidden
          rounded-2xl
          sm:h-[480px]
          lg:h-[540px]
          xl:h-[580px]
        "
      >


        {/* ==================== BACKGROUND IMAGE ==================== */}

        <img
          src={bannerImage}
          alt="Summer collection"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-[1500ms]
            ease-out
            group-hover:scale-105
          "
        />


        {/* ==================== GRADIENT OVERLAY ==================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/75
            via-black/35
            to-black/10
          "
        />


        {/* ==================== TOP LABEL ==================== */}

        <div
          className="
            absolute
            left-5
            top-5
            z-10
            sm:left-8
            sm:top-8
            lg:left-10
            lg:top-10
          "
        >

          <p
            className="
              text-[9px]
              font-medium
              tracking-[0.25em]
              text-white/70
              sm:text-[10px]
              lg:text-xs
            "
          >
            INJOY / 2026
          </p>

        </div>


        {/* ==================== CONTENT ==================== */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            items-end
          "
        >

          <div
            className="
              max-w-xl
              p-6
              text-white
              sm:p-10
              lg:p-14
              xl:p-16
            "
          >


            {/* Small Label */}

            <p
              className="
                mb-4
                text-[9px]
                font-medium
                tracking-[0.3em]
                text-white/70
                sm:mb-5
                sm:text-xs
              "
            >
              THE SUMMER EDIT
            </p>


            {/* Heading */}

            <h2
              className="
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-tight
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              Made For
              <br />
              Every Moment.
            </h2>


            {/* Description */}

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-relaxed
                text-white/75
                sm:mt-6
                sm:text-base
              "
            >
              Discover effortless styles designed for everyday
              life. Explore our latest collection and find your
              new favourite pieces.
            </p>


            {/* Button */}

            <Link
              to="/new-collection"
              className="
                group/button
                mt-7
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-white
                px-5
                py-3
                text-xs
                font-semibold
                tracking-wide
                text-gray-950
                transition-all
                duration-300
                hover:bg-gray-950
                hover:text-white
                sm:mt-8
                sm:px-6
                sm:py-3.5
                sm:text-sm
              "
            >

              Explore Collection

              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover/button:translate-x-1
                  group-hover/button:-translate-y-1
                "
              />

            </Link>

          </div>

        </div>


        {/* ==================== BOTTOM RIGHT DECORATION ==================== */}

        <div
          className="
            absolute
            bottom-5
            right-5
            z-10
            hidden
            items-center
            gap-3
            text-white/60
            sm:flex
            sm:bottom-8
            sm:right-8
            lg:bottom-10
            lg:right-10
          "
        >

          <span className="h-px w-10 bg-white/40" />

          <p
            className="
              text-[10px]
              tracking-[0.18em]
            "
          >
            SUMMER 2026
          </p>

        </div>

      </div>

    </section>

  );

};


export default PromoBanner;