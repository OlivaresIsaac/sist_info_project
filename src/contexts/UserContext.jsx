import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
// import { getUserProfile } from "../firebase/users";

export const UserContext = React.createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
//   const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
    //   setIsLoadingUser(true);
      if (firebaseUser ) { //&& !user
        // const userProfile = await getUserProfile(firebaseUser.email);
        // userProfile
        setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName
        });
      } else {
        setUser(null);
      }

    //   setIsLoadingUser(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        // isLoadingUser,
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