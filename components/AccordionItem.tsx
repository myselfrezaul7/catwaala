import * as React from 'react';
import { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `content-${id}`;
  const buttonId = `button-${id}`;

  return (
    <div className="border-b border-white/20 dark:border-white/10 last:border-b-0">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
        <ChevronDownIcon
          className={`w-6 h-6 text-slate-700 dark:text-slate-300 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-6 pt-0 text-slate-800 dark:text-slate-200 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AccordionItem);