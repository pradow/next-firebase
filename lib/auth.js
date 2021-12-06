import React, { useEffect, useState, useContext, createContext } from 'react';
import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { authentication } from './firebase';

const authContext = createContext();
const provider = new GithubAuthProvider();

export function ProvideAuth({ children }) {
  const authenticate = useProviderAuth();
  return (
    <authContext.Provider value={authenticate}>{children}</authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const signinWithGithub = () => {
    return signInWithPopup(authentication, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(user);
        return user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signout = () => {
    return signOut(authentication)
      .then(() => {
        // Sign-out successful.
        setUser(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUser({ user });
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}
