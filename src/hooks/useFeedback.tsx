/**
 * Feedback Hook - Micro-animations for CRUD operations
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { toast } from "sonner";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";

interface FeedbackOptions {
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
}

export const useFeedback = () => {
  const showSuccess = (message: string = "Operazione completata") => {
    toast.success(message, {
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      duration: 3000,
      className: "bg-card border-border",
    });
  };

  const showError = (message: string = "Si è verificato un errore") => {
    toast.error(message, {
      icon: <XCircle className="w-5 h-5 text-destructive" />,
      duration: 4000,
      className: "bg-card border-border",
    });
  };

  const showWarning = (message: string) => {
    toast.warning(message, {
      icon: <AlertCircle className="w-5 h-5 text-warning" />,
      duration: 3500,
      className: "bg-card border-border",
    });
  };

  const showLoading = (message: string = "Caricamento...") => {
    return toast.loading(message, {
      icon: <Loader2 className="w-5 h-5 text-primary animate-spin" />,
      className: "bg-card border-border",
    });
  };

  const dismissLoading = (toastId: string | number) => {
    toast.dismiss(toastId);
  };

  const withFeedback = async <T,>(
    operation: () => Promise<T>,
    options: FeedbackOptions = {}
  ): Promise<T | null> => {
    const {
      successMessage = "Operazione completata",
      errorMessage = "Si è verificato un errore",
      loadingMessage = "Caricamento...",
    } = options;

    const loadingToast = showLoading(loadingMessage);

    try {
      const result = await operation();
      dismissLoading(loadingToast);
      showSuccess(successMessage);
      return result;
    } catch (error) {
      dismissLoading(loadingToast);
      showError(errorMessage);
      return null;
    }
  };

  // Demo-specific feedback for simulated operations
  const simulateOperation = (
    successMessage: string,
    delay: number = 800
  ) => {
    const loadingToast = showLoading("Elaborazione...");
    
    setTimeout(() => {
      dismissLoading(loadingToast);
      showSuccess(successMessage);
    }, delay);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showLoading,
    dismissLoading,
    withFeedback,
    simulateOperation,
  };
};
