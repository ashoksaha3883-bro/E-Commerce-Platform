import {
  User,
  Mail,
  LogOut,
  ArrowLeft,
} from "lucide-react";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading profile...
        </p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleLogout = () => {
    logout();

    alert("You have been logged out.");

    navigate("/");
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-12 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to shopping
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.25em] text-gray-500">
            MY ACCOUNT
          </p>

          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Welcome, {user.name}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Manage your Injoy account.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden border border-gray-200 bg-white">

          {/* Profile Top */}
          <div className="border-b border-gray-100 px-6 py-7 sm:px-8">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <User
                  size={28}
                  strokeWidth={1.5}
                  className="text-gray-700"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Injoy Customer
                </p>
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="divide-y divide-gray-100">

            {/* Name */}
            <div className="flex items-center gap-4 px-6 py-5 sm:px-8">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                <User
                  size={18}
                  className="text-gray-600"
                />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  FULL NAME
                </p>

                <p className="mt-1 text-sm font-medium">
                  {user.name}
                </p>
              </div>

            </div>

            {/* Email */}
            <div className="flex items-center gap-4 px-6 py-5 sm:px-8">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                <Mail
                  size={18}
                  className="text-gray-600"
                />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  EMAIL ADDRESS
                </p>

                <p className="mt-1 text-sm font-medium">
                  {user.email}
                </p>
              </div>

            </div>

          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 px-6 py-6 sm:px-8">

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 border border-gray-200 py-3 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Profile;