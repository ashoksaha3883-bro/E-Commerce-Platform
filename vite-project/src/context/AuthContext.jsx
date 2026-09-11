import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

const API_URL = "https://e-commerce-platform-go96.onrender.com/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // RESTORE LOGIN AFTER PAGE REFRESH
  // =====================================================

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("injoy_token");
      const savedUser = localStorage.getItem("injoy_user");

      // No login information
      if (!token || !savedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Restore user immediately from localStorage
        const parsedUser = JSON.parse(savedUser);

        setUser(parsedUser);

        // Verify token with backend
        const response = await fetch(`${API_URL}/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Token is invalid/expired
        if (!response.ok) {
          localStorage.removeItem("injoy_token");
          localStorage.removeItem("injoy_user");

          setUser(null);

          return;
        }

        const data = await response.json();

        // If backend sends complete user information
        if (data.user) {
          localStorage.setItem(
            "injoy_user",
            JSON.stringify(data.user)
          );

          setUser(data.user);
        }
      } catch (error) {
        console.error("Restore Login Error:", error);

        // Only clear login if stored data is actually broken
        try {
          JSON.parse(savedUser);
        } catch {
          localStorage.removeItem("injoy_token");
          localStorage.removeItem("injoy_user");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Login failed"
      );
    }

    // Save token
    localStorage.setItem(
      "injoy_token",
      data.token
    );

    // Save user
    localStorage.setItem(
      "injoy_user",
      JSON.stringify(data.user)
    );

    // Update React state
    setUser(data.user);

    return data;
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const register = async (
    name,
    email,
    password
  ) => {
    const response = await fetch(
      `${API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Account creation failed"
      );
    }

    return data;
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("injoy_token");
    localStorage.removeItem("injoy_user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// USE AUTH
// =====================================================

export const useAuth = () => {
  return useContext(AuthContext);
};