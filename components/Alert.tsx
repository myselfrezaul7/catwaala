import React from 'react';
import { XCircleIcon, CheckCircleIcon, InformationCircleIcon, AlertTriangleIcon } from './icons';

interface AlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message: string | React.ReactNode;
  className?: string;
}

const icons = {
  error: <XCircleIcon className="w-6 h-6" />,
  success: <CheckCircleIcon className="w-6 h-6" />,
  warning: <AlertTriangleIcon className="w-6 h-6" />,
  info: <InformationCircleIcon className="w-6 h-6" />,
};

const colors = {
  error: 'bg-red-500/10 border-red-500 text-red-800 dark:text-red-200',
  success: 'bg-green-500/10 border-green-500 text-green-800 dark:text-green-200',
  warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-800 dark:text-yellow-200',
  info: 'bg-blue-500/10 border-blue-500 text-blue-800 dark:text-blue-200',
};

const Alert: React.FC<AlertProps> = ({ type, title, message, className = '' }) => {
  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${colors[type]} ${className}`} role="alert">
      <div className="flex">
        <div className="py-1 flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3">
          <p className="font-bold">{title}</p>
          <div className="text-sm mt-1">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
