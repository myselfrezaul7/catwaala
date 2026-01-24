import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon } from '../components/icons';
import FormError from '../components/FormError';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { loginWithGoogle, signupWithEmail } = useAuth();
  const navigate = useNavigate();

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

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await signupWithEmail(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full p-4 bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/60 dark:focus:bg-black/60 transition-all backdrop-blur-sm";

  return (
    <div className="container mx-auto px-6 py-16 flex-grow flex items-center justify-center">
      <div className="w-full max-w-md bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">Create Account</h1>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-8">Join Catwaala today</p>

        <FormError message={error} />

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
          className="flex items-center justify-center w-full p-4 mb-6 border border-white/30 dark:border-white/10 rounded-2xl bg-white/60 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg disabled:opacity-50 disabled:cursor-wait"
        >
          <GoogleIcon className="w-6 h-6" />
          <span className="ml-3 font-bold text-lg text-slate-700 dark:text-slate-200">
            {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-white/30 dark:border-white/10" />
          <span className="mx-4 text-slate-500 dark:text-slate-400 font-medium text-sm">OR</span>
          <hr className="flex-grow border-white/30 dark:border-white/10" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className={inputStyle}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputStyle}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className={inputStyle}
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className={inputStyle}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-4 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 transform active:scale-95 shadow-lg hover:shadow-orange-500/30 mt-2"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">Sign in</Link>
        </p>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;