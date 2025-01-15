import { useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  // create an user
  const userSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in an user
  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // update an user
  const updateUserProfile = (updateDoc) => {
    return updateProfile(auth.currentUser, updateDoc);
  };
  // user logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authInfo = {
    name: "rahu",
    userSignIn,
    loading,
    user,
    userSignUp,
    logOut,
    googleLogin,
    updateUserProfile,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("current use=>", currentUser);
      // if (currentUser) {
      //   // get token
      //   try {
      //     const userInfo = { email: currentUser.email };
      //     const { data } = await axiosPublic.post("/jwt", userInfo);
      //     if (data.token) {
      //       localStorage.setItem("access-token", data.token);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // } else {
      //   // todo remove token
      //   localStorage.removeItem("access-token");
      // }
      // setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
