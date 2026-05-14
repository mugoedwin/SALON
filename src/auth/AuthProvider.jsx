import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setIsAuthLoading(false);

      if (!nextUser) {
        setIsAdmin(false);
        setIsAdminLoading(false);
        return;
      }

      setIsAdminLoading(true);
      try {
        const [adminSnap, userSnap] = await Promise.all([
          getDoc(doc(db, "admins", nextUser.uid)),
          getDoc(doc(db, "users", nextUser.uid)),
        ]);
        const userRole = userSnap.exists() ? userSnap.data()?.role : null;
        setIsAdmin(adminSnap.exists() || userRole === "admin");
      } catch (error) {
        console.error("Failed to check admin role", error);
        setIsAdmin(false);
      } finally {
        setIsAdminLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthLoading,
      isAdmin,
      isAdminLoading,
    }),
    [user, isAuthLoading, isAdmin, isAdminLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider />");
  }
  return ctx;
}
