import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User as Artist } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  artist: null | Artist;
  session: null | Session;
  initialized: boolean;
  signOut?: () => void;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [artist, setArtist] = useState<null | Artist>(null);
  const [session, setSession] = useState<null | Session>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setSession(session);
          setArtist(session.user);
          setInitialized(true);
        }
      }
    );
    return () => data.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ artist, session, initialized, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
