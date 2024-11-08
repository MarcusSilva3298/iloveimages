import { CookiesEnum } from "@/enums/CookiesEnum";
import CookiesService from "@/services/cookies";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = CookiesService.getFromCookie(CookiesEnum.ACCESS_TOKEN);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
