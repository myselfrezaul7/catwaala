import { formatDistanceToNow } from "date-fns";

/**
 * Safely format a date (string, Date object, or Firestore Timestamp object)
 * Returns 'Recently' on any error to prevent UI crashes.
 */
export function safeTimeAgo(dateInput: any): string {
    if (!dateInput) return 'Recently';
    
    try {
        let dateObj: Date;

        if (typeof dateInput.toDate === 'function') {
            // It's a Firestore Timestamp
            dateObj = dateInput.toDate();
        } else {
            // It's a date string or already a Date object
            dateObj = new Date(dateInput);
        }

        // Check if the resulting date object is valid
        if (isNaN(dateObj.getTime())) {
            return 'Recently';
        }

        return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (error) {
        console.error("safeTimeAgo error:", error);
        return 'Recently';
    }
}
