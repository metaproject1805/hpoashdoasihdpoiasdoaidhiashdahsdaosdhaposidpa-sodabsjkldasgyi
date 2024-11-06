"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("access-token");
    const authenticated = !!token;
    setIsAuthenticated(authenticated);

    // Redirect if not authenticated and not on the allowed paths
    const allowedPaths = ["/", "/login", "/register", "/forgotPassword"];
    if (!authenticated && !allowedPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
