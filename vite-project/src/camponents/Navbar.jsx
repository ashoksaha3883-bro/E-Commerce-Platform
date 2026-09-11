import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  Link,
} from "react-router-dom";

import { useState } from "react";

import SearchModal from "./SearchModal.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "New Collection",
    path: "/new-collection",
  },
  {
    name: "Women",
    path: "/women",
  },
  {
    name: "Men",
    path: "/men",
  },
  {
    name: "Kids",
    path: "/kids",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartCount } = useCart();
  const { user } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-xl">

        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-[25px] font-semibold tracking-[-0.04em] text-gray-950 transition-opacity duration-200 group-hover:opacity-70">
              Injoy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 lg:flex xl:gap-9">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `
                    group relative py-2 text-[13px] font-medium
                    tracking-[0.01em] transition-colors duration-200
                    ${
                      isActive
                        ? "text-gray-950"
                        : "text-gray-500 hover:text-gray-950"
                    }
                  `
                }
              >
                {link.name}

                <span
                  className="
                    absolute bottom-0 left-0 h-[1.5px]
                    bg-gray-950 transition-all duration-300
                    w-0 group-hover:w-full
                  "
                />
              </NavLink>
            ))}

          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full text-gray-700
                transition-all duration-200
                hover:bg-gray-100 hover:text-gray-950
                active:scale-95
              "
            >
              <Search
                size={19}
                strokeWidth={1.7}
              />
            </button>

            {/* Account */}
            <Link
              to={user ? "/profile" : "/auth"}
              aria-label={user ? "My Profile" : "Sign In"}
              className="
                hidden h-10 w-10 items-center justify-center
                rounded-full text-gray-700
                transition-all duration-200
                hover:bg-gray-100 hover:text-gray-950
                active:scale-95 sm:flex
              "
            >
              <User
                size={19}
                strokeWidth={1.7}
              />
            </Link>

            {/* Shopping Bag */}
            <Link
              to="/cart"
              aria-label="Shopping bag"
              className="
                relative flex h-10 w-10
                items-center justify-center rounded-full
                text-gray-700 transition-all duration-200
                hover:bg-gray-100 hover:text-gray-950
                active:scale-95
              "
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.7}
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute right-[2px] top-[1px]
                    flex h-[17px] min-w-[17px]
                    items-center justify-center rounded-full
                    bg-gray-950 px-1 text-[9px]
                    font-semibold leading-none text-white
                    ring-2 ring-white
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="
                ml-1 flex h-10 w-10
                items-center justify-center rounded-full
                text-gray-700 transition-all duration-200
                hover:bg-gray-100 hover:text-gray-950
                active:scale-95 lg:hidden
              "
            >
              {menuOpen ? (
                <X
                  size={21}
                  strokeWidth={1.7}
                />
              ) : (
                <Menu
                  size={21}
                  strokeWidth={1.7}
                />
              )}
            </button>

          </div>

        </nav>

        {/* Mobile Menu */}
        <div
          className={`
            overflow-hidden border-t border-gray-100
            bg-white transition-all duration-300 lg:hidden
            ${
              menuOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="mx-auto max-w-[1440px] px-5 pb-7 pt-5 sm:px-6">

            <div className="flex flex-col">

              {navLinks.map((link, index) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `
                      flex items-center justify-between
                      border-b border-gray-100 py-4
                      text-[15px] font-medium
                      transition-colors duration-200
                      ${
                        isActive
                          ? "text-gray-950"
                          : "text-gray-500 hover:text-gray-950"
                      }
                    `
                  }
                >
                  <span>
                    {link.name}
                  </span>

                  <span className="text-xs text-gray-300">
                    0{index + 1}
                  </span>
                </NavLink>
              ))}

            </div>

            {/* Mobile Account */}
            <Link
              to={user ? "/profile" : "/auth"}
              onClick={() => setMenuOpen(false)}
              className="
                mt-5 flex items-center gap-3
                text-sm font-medium text-gray-700
              "
            >
              <User
                size={18}
                strokeWidth={1.7}
              />

              {user ? "My Profile" : "My Account"}
            </Link>

          </div>
        </div>

      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;