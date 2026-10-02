import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const Toast: React.FC<{ message: string; type?: ToastType; onClose?: () => void }> = ({
  message,
  type = 'info',
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between min-w-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-lg p-4">
      <div className="flex items-center space-x-3">
        {type === 'success' && <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" />}
        {type === 'error' && <AlertCircle className="text-rose-500 w-5 h-5 shrink-0" />}
        {type === 'warning' && <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0" />}
        {type === 'info' && <Info className="text-cyan-500 w-5 h-5 shrink-0" />}
        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-3">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      toast: (msg: string) => console.log(`[Toast fallback]: ${msg}`)
    };
  }
  return context;
};

export default ToastProvider;
