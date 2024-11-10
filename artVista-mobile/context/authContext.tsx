import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as Artist } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  artist: null | Artist;
  isAuthenticated: boolean;
  loading: boolean;
  signOut?: () => void;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [artist, setArtist] = useState<null | Artist>(null);
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
  }, []);

  const signOut = async () => {
    setLoading(true);
    await auth.signOut();
    setIsAuthenticated(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ artist, isAuthenticated, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
