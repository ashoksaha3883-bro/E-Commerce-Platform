import { Routes, Route } from "react-router-dom";

import Navbar from "./camponents/Navbar.jsx";
import Home from "./camponents/Home.jsx";
import Category from "./camponents/Category.jsx";
import Products from "./camponents/Products.jsx";
import PromoBanner from "./camponents/PromoBanner.jsx";
import Footer from "./camponents/Footer.jsx";

import NewCollection from "./pages/newCollections.jsx";
import Women from "./pages/Women.jsx";
import Men from "./pages/Men.jsx";
import Kids from "./pages/Kids.jsx";

import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import ProductDetails from "./pages/Productdetails.jsx";
import Cart from "./pages/Cart.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-950">

      <Navbar />

      <main>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Category />
                <Products />
                <PromoBanner />
              </>
            }
          />

          {/* COLLECTIONS */}
          <Route
            path="/new-collection"
            element={<NewCollection />}
          />

          <Route
            path="/women"
            element={<Women />}
          />

          <Route
            path="/men"
            element={<Men />}
          />

          <Route
            path="/kids"
            element={<Kids />}
          />

          {/* AUTH */}
          <Route
            path="/auth"
            element={<Auth />}
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* PRODUCT */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
};

export default App;