import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDky0FqbEbCHXKk02ikLO9IioWwRNdwJ44",
  authDomain: "just-chat-4ac92.firebaseapp.com",
  projectId: "just-chat-4ac92",
  storageBucket: "just-chat-4ac92.appspot.com",
  messagingSenderId: "783647752345",
  appId: "1:783647752345:web:a3ae58ff22911508807808",
  measurementId: "G-G3J9SGTRGB",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const firestore = getFirestore();

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      auth,
      firestore,
      app
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
