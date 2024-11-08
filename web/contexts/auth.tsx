"use client";

import { CookiesEnum } from "@/enums/CookiesEnum";
import { User } from "@/models/User";
import { signInFormSchemaType } from "@/schemas/SignInSchema";
import { signUpFormSchemaType } from "@/schemas/SignUpSchema";
import { api } from "@/services/api";
import CookiesService from "@/services/cookies";
import ErrorService from "@/services/errors";
import ToastService from "@/services/toast";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: User | null;
  authLoading: boolean;

  signIn: (props: signInFormSchemaType, callback: () => void) => Promise<void>;
  signUp: (props: signUpFormSchemaType, callback: () => void) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(props: signInFormSchemaType, callback: () => void) {
    setAuthLoading(true);

    await api
      .post("/auth/signIn", props)
      .then(({ data }) => {
        CookiesService.saveToCookie(CookiesEnum.ACCESS_TOKEN, data.accessToken);
        CookiesService.saveToCookie(
          CookiesEnum.REFRESH_TOKEN,
          data.refreshToken,
        );

        setUser(data.user);

        ToastService.success("Signed In sucefully!", "sucess-sign-in");
        callback();
      })
      .catch((error) => {
        ErrorService.handleError(error);
      });

    setTimeout(() => {
      setAuthLoading(false);
    }, 350);
  }

  async function signUp(props: signUpFormSchemaType, callback: () => void) {
    setAuthLoading(true);

    await api
      .post("/auth/signUp", props)
      .then(({ data }) => {
        CookiesService.saveToCookie(CookiesEnum.ACCESS_TOKEN, data.accessToken);
        CookiesService.saveToCookie(
          CookiesEnum.REFRESH_TOKEN,
          data.refreshToken,
        );

        setUser(data.user);

        ToastService.success("Signed Up sucefully!", "sucess-sign-up");
        callback();
      })
      .catch((error) => {
        ErrorService.handleError(error);
      });

    setTimeout(() => {
      setAuthLoading(false);
    }, 350);
  }

  function logout() {
    setAuthLoading(true);

    setUser(null);
    Object.values(CookiesEnum).forEach((cookie) =>
      CookiesService.removeCookie(cookie),
    );

    setTimeout(() => {
      setAuthLoading(false);
    }, 350);
  }

  async function getUserFromToken() {
    setAuthLoading(true);

    const token = CookiesService.getFromCookie(CookiesEnum.ACCESS_TOKEN);

    if (!token) {
      logout();
      return;
    }

    await api
      .get("/auth/me")
      .then(({ data }) => setUser(data))
      .catch((err) => {
        ErrorService.handleError(err);

        logout();
      });

    setTimeout(() => {
      setAuthLoading(false);
    }, 350);
  }

  useEffect(() => {
    getUserFromToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
