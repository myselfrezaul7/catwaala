import * as React from 'react';
import { WarningIcon } from './icons';

interface FormErrorProps {
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 animate-shake my-4">
        <WarningIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
        <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default FormError;