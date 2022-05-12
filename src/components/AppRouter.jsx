import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { Context } from "../index";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";

export default function AppRouter() {
  
  const { auth } = useContext(Context);

  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, component }) => (
        <Route path={path} element={component} key={path} />
      ))}
      <Route
        path={LOGIN_ROUTE}
        element={<Navigate replace to={CHAT_ROUTE} />}
      />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, component }) => (
        <Route path={path} element={component} key={path} />
      ))}
      <Route
        path={CHAT_ROUTE}
        element={<Navigate replace to={LOGIN_ROUTE} />}
      />
    </Routes>
  );
}
