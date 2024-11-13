import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Toast from "react-native-toast-message";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const useLogin = () => {
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please fill in all fields",
      });
      return;
    }
    try {
      const credentials = await signInWithEmailAndPassword(email, password);

      if (credentials) {
        const docRef = doc(db, "artists", credentials.user.uid);
        const docSnapshot = await getDoc(docRef);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred. Please try again",
      });
    }
  };

  return { login, loading, error };
};

export default useLogin;
