import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

interface DataErrorStateProps {
    message?: string;
    onRetry?: () => void;
    compact?: boolean;
}

export function DataErrorState({ 
    message = "Couldn't load data. Please try again.", 
    onRetry,
    compact = false
}: DataErrorStateProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center justify-center text-center bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-3xl ${compact ? 'py-8 px-4' : 'py-16 px-6'} max-w-lg mx-auto w-full`}
        >
            <div className={`rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-500 flex items-center justify-center mb-4 ${compact ? 'w-12 h-12' : 'w-16 h-16'}`}>
                <AlertTriangle className={compact ? 'w-6 h-6' : 'w-8 h-8'} />
            </div>
            
            <h3 className={`font-bold text-stone-800 dark:text-stone-200 mb-2 ${compact ? 'text-lg' : 'text-xl'}`}>
                Oops, something went wrong
            </h3>
            
            <p className="text-stone-500 dark:text-stone-400 mb-6 max-w-sm text-sm">
                {message}
            </p>
            
            {onRetry && (
                <Button 
                    onClick={onRetry} 
                    variant="outline" 
                    className="border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-rose-800/50 dark:hover:bg-rose-900/30 dark:text-rose-400 dark:bg-transparent rounded-xl"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Try Again
                </Button>
            )}
        </motion.div>
    );
}
