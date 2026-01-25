import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon } from '../components/icons';
import FormError from '../components/FormError';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const navigate = useNavigate();

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

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

  return (
    <>
      <div className="container mx-auto px-6 py-16 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl transition-all duration-300">
          <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">Welcome Back!</h1>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-8">Sign in to continue</p>

          <FormError message={error} />

          {/* Google Sign In */}
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

          {/* Divider */}
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
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline focus:outline-none"
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
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={email}
      />
    </>
  );
};

export default LoginPage;