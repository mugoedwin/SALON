import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  getBrowserLocale,
  getBrowserTimezone,
  getLocaleDirection,
  getLocaleLanguage,
  getLocaleRegion,
  normalizeLocale,
} from "../utils/locale";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const updateLocalePreference = useCallback(async (nextLocale) => {
    if (!auth.currentUser) {
      return null;
    }

    const locale = normalizeLocale(nextLocale);
    const timezone = profile?.timezone || getBrowserTimezone();
    const region = getLocaleRegion(locale);

    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        locale,
        timezone,
        preferredRegion: region,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    setProfile((current) =>
      current
        ? {
            ...current,
            locale,
            timezone,
            region,
            dir: getLocaleDirection(locale),
          }
        : current,
    );

    return locale;
  }, [profile?.timezone]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } finally {
      if (typeof localStorage !== "undefined") {
        localStorage.clear();
      }
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.clear();
      }
      setUser(null);
      setIsAdmin(false);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setIsAuthLoading(false);

      if (!nextUser) {
        setIsAdmin(false);
        setIsAdminLoading(false);
        setProfile(null);
        return;
      }

      setIsAdminLoading(true);
      try {
        const [adminSnap, userSnap] = await Promise.all([
          getDoc(doc(db, "admins", nextUser.uid)),
          getDoc(doc(db, "users", nextUser.uid)),
        ]);
        const userData = userSnap.exists() ? userSnap.data() : {};
        const userRole = userData?.role ?? null;
        const locale = userData?.locale || getBrowserLocale();
        const timezone = userData?.timezone || getBrowserTimezone();

        setIsAdmin(adminSnap.exists() || userRole === "admin");
        setProfile({
          id: nextUser.uid,
          name:
            userData?.name ||
            nextUser.displayName ||
            nextUser.email?.split("@")[0] ||
            "there",
          email: nextUser.email || userData?.email || "",
          role: adminSnap.exists() || userRole === "admin" ? "admin" : "client",
          locale,
          timezone,
          region: userData?.preferredRegion || getLocaleRegion(locale),
          lastLoginDay: userData?.lastLoginDay || null,
          previousLoginDay: userData?.previousLoginDay || null,
          loginCount: userData?.loginCount || 0,
          dir: getLocaleDirection(locale),
        });
      } catch (error) {
        console.error("Failed to check admin role", error);
        setIsAdmin(false);
        const locale = getBrowserLocale();
        setProfile({
          id: nextUser.uid,
          name:
            nextUser.displayName ||
            nextUser.email?.split("@")[0] ||
            "there",
          email: nextUser.email || "",
          role: "client",
          locale,
          timezone: getBrowserTimezone(),
          region: getLocaleRegion(locale),
          lastLoginDay: null,
          previousLoginDay: null,
          loginCount: 0,
          dir: getLocaleDirection(locale),
        });
      } finally {
        setIsAdminLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      isAuthLoading,
      isAdmin,
      isAdminLoading,
      logout,
      updateLocalePreference,
    }),
    [user, profile, isAuthLoading, isAdmin, isAdminLoading, logout, updateLocalePreference],
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const locale = profile?.locale || getBrowserLocale();
    document.documentElement.lang = getLocaleLanguage(locale);
    document.documentElement.dir = getLocaleDirection(locale);
  }, [profile?.locale]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider />");
  }
  return ctx;
}
