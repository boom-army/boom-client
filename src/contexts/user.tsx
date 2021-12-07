import React, { useState, useEffect } from "react";

export interface User {
  handle: string;
  id: string;
  publicAddress: string;
}

export interface UserContextType {
  user: User | null,
  setUser: ((user: User | null) => User | void),
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => console.warn("no setUser function provided"),
});

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, _setUser] = useState<User | null>(null);

  useEffect(() => {
    const userFromStore = localStorage.getItem('user');

    if (userFromStore) {
      _setUser(JSON.parse(userFromStore));
    }
  }, []);

  const setUser = (user: User | null) => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
    _setUser(user);
    return user;
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
