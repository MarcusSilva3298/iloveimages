import ErrorService from "@/services/errors";
import Cookies from "js-cookie";

export default class CookiesService {
  public static saveToCookie(key: string, value: string) {
    try {
      Cookies.set(key, value);
    } catch (error) {
      ErrorService.handleError(error);
    }
  }

  public static getFromCookie(key: string): string | undefined {
    return Cookies.get(key);
  }

  public static removeCookie(key: string): void {
    Cookies.remove(key);
  }
}
