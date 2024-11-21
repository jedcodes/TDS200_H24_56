import { auth } from "@/lib/firebase";
import { AuthContextType } from "@/types/type";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType>({
  artist: null,
  isAuthenticated: false,
  loading: false,
  setUser: () => {},
  signout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [artist, setArtist] = useState<null | User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setArtist(user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setArtist(null);
        setIsAuthenticated(false);
      }
    });

    // Rydder opp etter seg funksjonen
    return () => unsubscribe();
  }, [artist]);

  const setUser = (user: User) => {
    setArtist(user);
  };

  const signout = async () => {
    await signOut(auth);
    setArtist(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ artist, isAuthenticated, loading, setUser, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
