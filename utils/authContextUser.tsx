"use client";
import { SetStateAction, createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IFUser, IUser, IUserFetched } from "@/types";
import axios from "axios";

import { eCheck, useCustomToast } from "@/components/helpers/functions";
import toast from "react-hot-toast";

// Create a context for authentication
const AuthContext = createContext({});

// Provider component for authentication context
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State for firebase user
  const [fUser, setFUser] = useState<IFUser | {} | null>({});
  // State for login status
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // Custom toast function
  const { customToast, loading } = useCustomToast();
  // State for modal open status
  const [modalOpen, setModalOpen] = useState(false);
  // State for user
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  // Effect to set login status based on firebase user
  useEffect(() => {
    if (fUser && (fUser as IFUser)?.uid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [fUser]);

  // Function to fetch user from API
  const fetchUser = async (uid: string) =>
    await axios
      .get(`/api/users?uid=${uid}`)
      .then(eCheck)
      .then((user) => {
        if (user) {
          setUser({
            displayName: user.displayName,
            email: user.email,
            isSeller: user.isSeller,
            status: user.status,
            uid: user.uid,
            county: user.county,
            thumbnail: user.thumbnail,
          });
          setFUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          toast.error("User does not exist");
          localStorage.removeItem("user");
          setUser(null);
          setFUser(null);
        }
      });
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await axios
          .get(`/api/users?uid=${userCredential.user.uid}`)
          .then(eCheck);
        window.location.href = "/";
      })
      .catch((error) => {
        const errorMessage = error.message;
        throw new Error(errorMessage);
      });
  };
  // Effect to handle authentication state changes
  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: IUser | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (localUser?.uid === user.uid) {
          setFUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          setUser(localUser);
        } else {
          fetchUser(user.uid).catch((err) => {});
        }
      } else {
        setFUser(null);
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  // Function to handle logout
  const logout = async () => {
    await auth.signOut();
    setFUser(null);
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Return provider with context values
  return (
    <AuthContext.Provider
      value={{
        user,
        fetchUser,
        logout,
        fUser,
        setModalOpen,
        modalOpen,
        loggedIn,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Interface for authentication context properties
interface AuthContextProps {
  user: IUserFetched;
  fUser: IFUser | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  fetchUser: (uid: string) => void;
  logout: () => Promise<void>;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
  loggedIn: boolean;
}

// Custom hook to use authentication context
const useUser = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;

  return authContext;
};

export { useUser, AuthProvider };
