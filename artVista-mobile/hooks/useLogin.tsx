import { auth } from "@/lib/firebase";
import { Toast } from "toastify-react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/context/authContext";

const useLogin = () => {
  const { setUser } = useAuth();

  const login = async (email: string, password: string) => {
    try {
      const userUredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userUredentials) {
        setUser(userUredentials.user);
      }
    } catch (error) {
      Toast.error("An error occurred. Please try again");
    }
  };

  return { login };
};

export default useLogin;
