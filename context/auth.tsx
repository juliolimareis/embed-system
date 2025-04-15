'use client'; 

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
} from 'firebase/auth';
import { useFirebase } from '@/hooks/firebase'; 

interface AuthContextType {
  user: User | null;
  loading: boolean;
  auth: Auth | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { auth } = useFirebase(); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [auth]); 

  const loginWithGoogle = useCallback(async () => {
    if (!auth) {
        console.error("Auth not initialized yet.");
        return;
    }
    
    setLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      setLoading(false); // Ensure loading stops on error
    }
  }, [auth]);

  const logout = useCallback(async () => {
    if (!auth) {
      console.error("Auth not initialized yet.");
      return;
    }

    setLoading(true); 
    
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error during sign-out:', error);
      setLoading(false); 
    }
  }, [auth]);

  const value = React.useMemo(() => ({
    user,
    loading,
    auth, // Exposing auth instance (optional)
    loginWithGoogle,
    logout,
    setUser
  }), [user, loading, auth, loginWithGoogle, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
