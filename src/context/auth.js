import React, { createContext, useState } from "react";

const AuthContext = createContext({
  signed: false,
  user: {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

  async function signIn(token) {
    setUser(token);
  }

  async function changeUser(response) {
    setUserID(response);
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        changeUser,
        userID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
