import ToastService from "@/services/toast";
import { AxiosError } from "axios";

export default class ErrorService {
  static handleError(error: unknown): void {
    let message: string = "An unexpected error occurred";

    if (error instanceof AxiosError && error.status !== 500) {
      message = error.response?.data.message;
    } else {
      console.error(error);
    }

    ToastService.error(message, `error`);
  }
}
