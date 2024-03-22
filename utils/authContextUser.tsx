"use client";
import { SetStateAction, createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IFUser, IUser, IUserFetched } from "@/types";
import axios from "axios";

import { useCustomToast } from "@/components/helpers/functions";
import toast from "react-hot-toast";
const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [fUser, setFUser] = useState<IFUser | {} | null>({});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { customToast, loading } = useCustomToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (fUser && (fUser as IFUser)?.uid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [fUser]);

  const fetchUser = async (uid: string) =>
    await axios.get(`/api/users?uid=${uid}`).then((res) => {
      const user = res.data;
      if (user) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(user));
        setFUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        toast.error("User does not exist");
        localStorage.removeItem("user");
        setUser(null);
        setFUser(null);
      }
    });

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: IUser | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log({ user });
        if (localUser?.uid === user.uid) {
          setFUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          setUser(localUser);
        } else {
          fetchUser(user.uid).catch((err) => {
            if (err.response.status === 404) {
              console.log("User does not exist");
            }
          });
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
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const signIn = async () =>
      await signInWithPopup(auth, provider).then(async (result) => {
        const { displayName, email, uid } = result.user;
        if (displayName && email && uid) {
          {
            const data: IUser = {
              uid: uid,
              email: email,
              isSeller: false,
              displayName,
              status: "active",
            };
            await axios.post("/api/users", data);
          }
        } else {
          throw new Error("Could not sign in");
        }
      });
    customToast({
      func: signIn,
      suc: "Signed in successfully",
      err: "Could not sign in",
      sfunc: () => (window.location.href = "/profile"),
    });
    setModalOpen(false);
  };

  //login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const signIn = async () =>
      await signInWithPopup(auth, provider).then(async (result) => {
        const { uid } = result.user;
        if (uid) {
          {
            await fetchUser(uid);
          }
        }
      });
    customToast({
      func: signIn,
      suc: "Signed in successfully",
      err: "Could not sign in",
    });
    setModalOpen(false);
  };

  const logout = async () => {
    await auth.signOut();
    setFUser(null);
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        fetchUser,
        logout,
        handleGoogleLogin,
        fUser,
        setModalOpen,
        modalOpen,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  user: IUserFetched;
  fUser: IFUser | null;
  handleSignIn: () => void;
  fetchUser: (uid: string) => void;
  logout: () => Promise<void>;
  handleGoogleLogin: () => void;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
  loggedIn: boolean;
}

const useUser = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;

  return authContext;
};

export { useUser, AuthProvider };
