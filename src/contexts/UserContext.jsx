import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { getUserProfile } from "../firebase/users-service";
import { useNavigate } from "react-router"
import { LANDING_URL } from "../constants/url";

export const UserContext = React.createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoadingUser(true);
      if (firebaseUser ) { //&& !user
        const userProfile = await getUserProfile(firebaseUser.email);
       
        setUser(userProfile);
       
      } else {
        setUser(null);
      }
      navigate(LANDING_URL)

      setIsLoadingUser(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoadingUser,
        // setIsLoadingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}