import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from './types';

// --- Storage Utility Functions ---
const STORAGE_KEY_USERS = 'solvesphere-users';
const STORAGE_KEY_CURRENT_USER = 'solvesphere-currentUser';

const getStoredUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Failed to parse currentUser from localStorage", e);
    return null;
  }
};

const setStoredUser = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  } catch (e) {
    console.error("Failed to save currentUser to localStorage", e);
  }
};

const getStoredUsers = (): Record<string, string> => {
  try {
    const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  } catch (e) {
    console.error("Failed to parse users from localStorage", e);
  }
  // Seed with a default user for easy testing if none exist
  const defaultUsers = { 'testuser': 'password123' };
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(defaultUsers));
  return defaultUsers;
};

const setStoredUsers = (users: Record<string, string>) => {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save users to localStorage", e);
  }
};

// --- Auth Context ---

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password?: string) => boolean;
  signup: (username: string, password?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getStoredUser);

  const login = useCallback((username: string, password?: string): boolean => {
    const users = getStoredUsers();
    const storedPassword = users[username.toLowerCase()];
    if (storedPassword !== undefined && storedPassword === password) {
      const user: User = { username };
      setCurrentUser(user);
      setStoredUser(user);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((username: string, password?: string): boolean => {
    const users = getStoredUsers();
    if (users[username.toLowerCase()] !== undefined) {
      return false; // User already exists
    }
    const newUsers = { ...users, [username.toLowerCase()]: password || '' };
    setStoredUsers(newUsers);

    const user: User = { username };
    setCurrentUser(user);
    setStoredUser(user);
    return true;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setStoredUser(null);
  }, []);

  const value = { currentUser, login, signup, logout };

  // Use React.createElement with the new React 19 Context API syntax.
  // Instead of AuthContext.Provider, we render the context object directly.
  return React.createElement(AuthContext, { value: value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};