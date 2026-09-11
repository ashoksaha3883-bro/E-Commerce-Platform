import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

import { products } from "../camponents/data/Productdata.js";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-white">

      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">

          <Search size={22} className="text-gray-500" />

          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search products..."
            className="flex-1 text-lg outline-none"
          />

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close search"
          >
            <X size={22} />
          </button>

        </div>


        {/* Search Results */}

        <div className="mt-10">

          {searchTerm && (
            <p className="text-sm text-gray-500 mb-6">
              {filteredProducts.length} results found
            </p>
          )}


          {/* Products */}

          {searchTerm && filteredProducts.length > 0 && (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

              {filteredProducts.map((product) => (

                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="group"
                >

                  <div className="overflow-hidden bg-gray-100">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[240px] sm:h-[320px]
                      object-cover transition duration-500
                      group-hover:scale-105"
                    />

                  </div>

                  <div className="pt-3">

                    <p className="text-xs text-gray-500">
                      {product.category}
                    </p>

                    <h3 className="font-medium mt-1">
                      {product.name}
                    </h3>

                    <p className="text-sm mt-2">
                      ₹{product.price}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          )}


          {/* No Results */}

          {searchTerm && filteredProducts.length === 0 && (

            <div className="py-20 text-center">

              <h2 className="text-xl font-medium">
                No products found
              </h2>

              <p className="text-sm text-gray-500 mt-3">
                Try searching for something else.
              </p>

            </div>

          )}


          {/* Initial State */}

          {!searchTerm && (

            <div className="py-20 text-center">

              <p className="text-gray-500">
                Search our latest collections.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default SearchModal;