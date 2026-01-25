import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon } from '../components/icons';
import FormError from '../components/FormError';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { loginWithGoogle, loginWithEmail, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Forgot Password State
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleGoogleSignIn = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setIsLoading(true);
    try {
      await resetPassword(email);
      setResetMessage('Check your email inbox for password reset instructions.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 flex-grow flex items-center justify-center">
      <div className="w-full max-w-md bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl transition-all duration-300">
        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
          {isResetMode ? 'Reset Password' : 'Welcome Back!'}
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
          {isResetMode ? 'Enter your email to receive a reset link' : 'Sign in to continue'}
        </p>

        <FormError message={error} />
        {resetMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-xl text-sm flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {resetMessage}
          </div>
        )}

        {isResetMode ? (
          /* Forgot Password Form */
          <form onSubmit={handlePasswordReset} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                id="reset-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full p-4 bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/60 dark:focus:bg-black/60 transition-all backdrop-blur-sm"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-4 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 transform active:scale-95 shadow-lg hover:shadow-orange-500/30"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => { setIsResetMode(false); setError(''); setResetMessage(''); }}
                className="text-sm font-bold text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          /* Login Form */
          <>
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
              className="flex items-center justify-center w-full p-4 mb-6 border border-white/30 dark:border-white/10 rounded-2xl bg-white/60 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg disabled:opacity-50 disabled:cursor-wait"
            >
              <GoogleIcon className="w-6 h-6" />
              <span className="ml-3 font-bold text-lg text-slate-700 dark:text-slate-200">
                {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-white/30 dark:border-white/10" />
              <span className="mx-4 text-slate-500 dark:text-slate-400 font-medium text-sm">OR</span>
              <hr className="flex-grow border-white/30 dark:border-white/10" />
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full p-4 bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/60 dark:focus:bg-black/60 transition-all backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => { setIsResetMode(true); setError(''); }}
                    className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full p-4 bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/60 dark:focus:bg-black/60 transition-all backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-4 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 transform active:scale-95 shadow-lg hover:shadow-orange-500/30"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
              Don't have an account? <Link to="/signup" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">Sign up</Link>
            </p>

            <div className="mt-6 text-center">
              <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                ← Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;