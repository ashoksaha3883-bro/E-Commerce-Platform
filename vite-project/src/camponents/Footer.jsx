import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";


const Footer = () => {

  const currentYear = new Date().getFullYear();


  return (

    <footer className="mt-8 bg-gray-950 text-white sm:mt-12">

      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14">


        {/* ==================== NEWSLETTER ==================== */}

        <div
          className="
            flex flex-col gap-5
            border-b border-white/10
            pb-8
            md:flex-row
            md:items-center
            md:justify-between
            sm:pb-10
          "
        >

          <div>

            <p className="text-[10px] font-medium tracking-[0.25em] text-white/40">
              STAY UPDATED
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Style, delivered to your inbox.
            </h2>

          </div>


          <form
            onSubmit={(e) => e.preventDefault()}
            className="
              flex w-full max-w-md items-center
              border-b border-white/30 pb-2
              transition-colors duration-300
              focus-within:border-white
              md:w-[420px]
            "
          >

            <input
              type="email"
              placeholder="Enter your email"
              className="
                min-w-0 flex-1
                bg-transparent py-2
                text-sm text-white
                outline-none
                placeholder:text-white/40
              "
            />

            <button
              type="submit"
              aria-label="Subscribe"
              className="
                ml-3 flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-full
                text-white
                transition-all duration-200
                hover:bg-white
                hover:text-gray-950
              "
            >

              <ArrowRight
                size={18}
                strokeWidth={1.8}
              />

            </button>

          </form>

        </div>


        {/* ==================== MAIN FOOTER ==================== */}

        <div
          className="
            grid grid-cols-2
            gap-x-8 gap-y-10
            py-10
            sm:grid-cols-4
            lg:py-12
          "
        >


          {/* Brand */}

          <div className="col-span-2 sm:col-span-1">

            <NavLink
              to="/"
              className="text-2xl font-semibold tracking-[-0.04em]"
            >
              Injoy
            </NavLink>


            <p className="mt-3 max-w-[220px] text-xs leading-relaxed text-white/45">
              Everyday fashion designed for modern life.
            </p>


            {/* Social Links */}

            <div className="mt-5 flex items-center gap-2">


              {/* Instagram */}

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  text-[10px] font-medium
                  text-white/70
                  transition-all duration-200
                  hover:bg-white
                  hover:text-gray-950
                "
              >
                IG
              </a>


              {/* Facebook */}

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  text-xs font-semibold
                  text-white/70
                  transition-all duration-200
                  hover:bg-white
                  hover:text-gray-950
                "
              >
                f
              </a>


              {/* X / Twitter */}

              <a
                href="#"
                aria-label="X"
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  text-[10px] font-medium
                  text-white/70
                  transition-all duration-200
                  hover:bg-white
                  hover:text-gray-950
                "
              >
                X
              </a>

            </div>

          </div>


          {/* Shop */}

          <div>

            <h3 className="text-[10px] font-medium tracking-[0.2em] text-white/40">
              SHOP
            </h3>

            <div className="mt-4 flex flex-col gap-2.5 text-xs text-white/60">

              <NavLink
                to="/new-collection"
                className="transition-colors hover:text-white"
              >
                New Collection
              </NavLink>

              <NavLink
                to="/women"
                className="transition-colors hover:text-white"
              >
                Women
              </NavLink>

              <NavLink
                to="/men"
                className="transition-colors hover:text-white"
              >
                Men
              </NavLink>

              <NavLink
                to="/kids"
                className="transition-colors hover:text-white"
              >
                Kids
              </NavLink>

            </div>

          </div>


          {/* Support */}

          <div>

            <h3 className="text-[10px] font-medium tracking-[0.2em] text-white/40">
              SUPPORT
            </h3>

            <div className="mt-4 flex flex-col gap-2.5 text-xs text-white/60">

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Contact
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Shipping
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Returns
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                FAQ
              </a>

            </div>

          </div>


          {/* Company */}

          <div>

            <h3 className="text-[10px] font-medium tracking-[0.2em] text-white/40">
              COMPANY
            </h3>

            <div className="mt-4 flex flex-col gap-2.5 text-xs text-white/60">

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                About
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Journal
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Careers
              </a>

              <a
                href="#"
                className="transition-colors hover:text-white"
              >
                Privacy
              </a>

            </div>

          </div>

        </div>


        {/* ==================== BOTTOM ==================== */}

        <div
          className="
            flex flex-col gap-3
            border-t border-white/10
            pt-5
            text-[10px]
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p>
            © {currentYear} Injoy. All rights reserved.
          </p>


          <div className="flex items-center gap-4">

            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              Cookies
            </a>

          </div>

        </div>

      </div>

    </footer>

  );

};


export default Footer;