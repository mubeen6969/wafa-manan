import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ToastContext = createContext(null);
const ICONS = { success: CheckCircle2, error: XCircle, info: Info };

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message, type = "info", duration = 3500) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const toast = useRef({
    success: (message, duration) => show(message, "success", duration),
    error: (message, duration) => show(message, "error", duration),
    info: (message, duration) => show(message, "info", duration),
  }).current;

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((item) => (
          <ToastItem key={item.id} toast={item} onDismiss={() => dismiss(item.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }) {
  const ref = useRef(null);
  const Icon = ICONS[toast.type] || Info;

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return undefined;
      const tween = gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
      return () => tween.kill();
    },
    { scope: ref }
  );

  const handleDismiss = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      onDismiss();
      return;
    }
    gsap.to(ref.current, { opacity: 0, x: 40, duration: 0.25, ease: "power2.in", onComplete: onDismiss });
  };

  return (
    <div className={`toast toast-${toast.type}`} ref={ref} role="status">
      <Icon size={18} />
      <span className="toast-message">{toast.message}</span>
      <button type="button" className="toast-close" onClick={handleDismiss} aria-label="Dismiss notification">
        <X size={14} />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
