import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  username: string;
  phone: string;
  status: "online" | "offline";
  lastSeen: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (data: User) => {
    setUser(data);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
