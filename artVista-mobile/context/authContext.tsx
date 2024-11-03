import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as Artist } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  artist: null | Artist;
  isAuthenticated: boolean;
  message: string;
  signOut?: () => void;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [artist, setArtist] = useState<null | Artist>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setArtist(user);
        setIsAuthenticated(true);
        setMessage("You are now signed in");
      } else {
        setArtist(null);
        setIsAuthenticated(false);
      }
    });

    // Rydder opp etter seg funksjonen
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setIsAuthenticated(false);
    setMessage("You are now signed out");
  };

  return (
    <AuthContext.Provider value={{ artist, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
