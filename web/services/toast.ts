import { toast, ToastOptions } from "react-toastify";

export default class ToastService {
  private static defaultConfig: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  static success(
    message: string,
    toastId: string,
    config: ToastOptions = {},
  ): void {
    toast.success(message, {
      ...this.defaultConfig,
      ...config,
      toastId: toastId,
    });
  }

  static error(
    message: string,
    toastId: string,
    config: ToastOptions = {},
  ): void {
    toast.error(message, {
      ...this.defaultConfig,
      ...config,
      toastId: toastId,
    });
  }

  static warning(
    message: string,
    toastId: string,
    config: ToastOptions = {},
  ): void {
    toast.warning(message, {
      ...this.defaultConfig,
      ...config,
      toastId: toastId,
    });
  }

  static info(
    message: string,
    toastId: string,
    config: ToastOptions = {},
  ): void {
    toast.info(message, {
      ...this.defaultConfig,
      ...config,
      toastId: toastId,
    });
  }
}
