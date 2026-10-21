import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-blue-600" />;
        let borderClass = 'border-blue-200 bg-white';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
          borderClass = 'border-emerald-200 bg-white';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-4 h-4 text-amber-600" />;
          borderClass = 'border-amber-200 bg-white';
        } else if (toast.type === 'error') {
          icon = <XCircle className="w-4 h-4 text-red-600" />;
          borderClass = 'border-red-200 bg-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-start gap-3 transition-all transform translate-y-0 ${borderClass}`}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-neutral-900 truncate">{toast.title}</h4>
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
