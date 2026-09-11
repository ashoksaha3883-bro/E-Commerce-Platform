import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const Auth = () => {
  const navigate = useNavigate();

  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);

      // ========================================
      // LOGIN
      // ========================================

      if (isLogin) {
        await login(email, password);

        alert("You are successfully logged in.");

        navigate("/profile");
        return;
      }

      // ========================================
      // REGISTER
      // ========================================

      await register(name, email, password);

      alert("Account created successfully. Please sign in.");

      setName("");
      setEmail("");
      setPassword("");

      setIsLogin(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // SWITCH LOGIN / REGISTER
  // ==========================================

  const switchMode = () => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setIsLogin(!isLogin);
  };

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md border border-gray-100 bg-white p-6 shadow-sm sm:p-10">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to shopping
        </Link>

        {/* Heading */}
        <div className="mt-8">
          <p className="text-xs tracking-[0.25em] text-gray-500">
            WELCOME TO INJOY
          </p>

          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {isLogin
              ? "Sign in to access your account."
              : "Create your account and start shopping."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-black"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-black"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-200 py-3 pl-11 pr-11 outline-none transition focus:border-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-black"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot */}
          {isLogin && (
            <button
              type="button"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Forgot password?
            </button>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && <Loader2 size={17} className="animate-spin" />}

            {isLoading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* Switch */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={switchMode}
            className="ml-2 font-medium text-black hover:underline"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </div>

      </div>
    </main>
  );
};

export default Auth;