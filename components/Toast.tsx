import React from 'react';
import type { Toast as ToastType } from '../types';

interface ToastProps {
  toast: ToastType;
  onDismiss: () => void;
}

const toastConfig = {
  error: {
    bg: 'bg-red-800/95 border-red-600',
  },
  success: {
    bg: 'bg-green-800/95 border-green-600',
  },
  info: {
    bg: 'bg-blue-800/95 border-blue-600',
  },
};

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const config = toastConfig[toast.type] || toastConfig.info;

  return (
    <div
      className={`flex items-start p-4 rounded-lg shadow-lg text-white border backdrop-blur-sm ${config.bg} animate-fade-in-right`}
      role="alert"
    >
      <div className="flex-1">
        <p className="text-sm font-semibold">{toast.message}</p>
      </div>
      <button onClick={onDismiss} className="ml-4 -mr-1 -mt-1 p-1 rounded-full hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <style>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;
