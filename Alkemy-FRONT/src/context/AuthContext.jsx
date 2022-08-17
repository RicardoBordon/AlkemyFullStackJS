import {
  createContext,
  useMemo,
  useState,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Navigate, Outlet } from 'react-router-dom';


export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  //URL API
  const base = import.meta.env.VITE_BASE_URL;
  const [dataUser, setDataUser] = useState({});
  

  const login = useCallback( function (response) {
        setDataUser(response);
        cookies.set("id", response.data.id_users)
        sessionStorage.setItem("user", true);
    }, [])

  const logout = useCallback(function () {
    sessionStorage.removeItem("user");
  }, []);

  const value = useMemo(
    () => ({
      login,
      dataUser,
      logout,
    }),
    [login, dataUser, setDataUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
