import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { Context } from ".";
import Loader from "./components/Loader";

function App() {

  const { auth } = useContext(Context);

  const [ , loading, ] = useAuthState(auth);

  if (loading) {
    return <Loader />
  }


  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
