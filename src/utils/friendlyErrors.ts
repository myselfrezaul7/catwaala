/**
 * Translates Firebase Auth error codes into friendly, user-facing failure messages.
 * Falls back to a generic message if the code is unknown.
 */
export function friendlyAuthMessage(code: string): string {
    const messages: Record<string, string> = {
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/too-many-requests': 'Too many attempts. Please verify you are human or try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/popup-closed-by-user': 'Sign-in was cancelled.',
        'auth/user-disabled': 'This account has been disabled. Please contact support.',
        'auth/invalid-email': 'Please enter a valid email address.'
    };
    
    return messages[code] || 'Something went wrong. Please try again.';
}
