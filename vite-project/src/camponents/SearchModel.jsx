import { Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { products } from "./data/Productdata.js";

const SearchModel = ({ isOpen, onClose }) => {
const [searchTerm, setSearchTerm] = useState("");

if (!isOpen) return null;

const filteredProducts = products.filter((product) => {
const searchValue = searchTerm.toLowerCase();

```
return (
  product.name.toLowerCase().includes(searchValue) ||
  product.category.toLowerCase().includes(searchValue)
);
```

});

return ( <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"> <div className="min-h-screen bg-white">

```
    <div className="mx-auto max-w-5xl px-6 lg:px-10">

      {/* Search Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 py-6">

        <Search size={22} />

        <input
          autoFocus
          type="text"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          placeholder="Search products..."
          className="
            flex-1
            border-none
            bg-transparent
            text-lg
            outline-none
            placeholder:text-gray-400
          "
        />

        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-gray-100
          "
          aria-label="Close search"
        >
          <X size={22} />
        </button>

      </div>

      {/* Search Results */}
      <div className="py-10">

        {!searchTerm ? (
          <p className="text-sm text-gray-500">
            Start typing to search for products.
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found for "{searchTerm}"
          </p>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              {filteredProducts.length} product
              {filteredProducts.length > 1 ? "s" : ""} found
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">

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
                      className="
                        h-[240px]
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                        sm:h-[300px]
                      "
                    />

                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    {product.category}
                  </p>

                  <h3 className="mt-1 text-sm font-medium">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm">
                    ₹{product.price}
                  </p>

                </Link>
              ))}

            </div>
          </>
        )}

      </div>

    </div>
  </div>
</div>


);
};

export default SearchModel;
