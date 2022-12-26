import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseInitAuth from "../Firebase/Firebase.init";
import swal from "sweetalert";

firebaseInitAuth();

const UseFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth();

  const handleWithGoogle = () => {
    const gogleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, gogleProvider);
  };
  // create in email
  const handleCreateEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in email
  const hanldleSignInEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // log out function
  const logOut = () => {
    swal({
      title: "Are you sure want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        signOut(auth)
          .then(() => {
            setUser({});
            setError("");
            swal("Your Aceount has been Log out now", {
              icon: "success",
            });
          })
          .catch((error) => {})
          .finally(() => setIsLoading(false));
      }
    });
  };
  // update email and password
  const updateUserInfo = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((result) => {
        setUser(result);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // admin check

        fetch(
          `https://grocery-store-api-y99i.onrender.com/users/${user?.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            setAdmin(data.admin);
            if (user?.email === "admin@admin.com") {
              setAdmin(true);
            }
          });
      }
      setIsLoading(false);
    });
  }, [user]);

  return {
    handleWithGoogle,
    user,
    setUser,
    isLoading,
    setIsLoading,
    logOut,
    handleCreateEmail,
    hanldleSignInEmail,
    updateUserInfo,
    error,
    setError,
    admin,
  };
};

export default UseFirebase;
