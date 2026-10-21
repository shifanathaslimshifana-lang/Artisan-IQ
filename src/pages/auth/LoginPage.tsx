import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { GlassmorphismBackground } from '../../components/layout/GlassmorphismBackground';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  KeyRound,
  X,
  Check,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, currentRole, showToast } = useApp();

  const [username, setUsername] = useState('meenakshi.vilachery');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      showToast('error', 'Username Required', 'Please enter your username or registered email address.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Automatically detect role or preserve current role
      const lower = username.toLowerCase();
      let targetRole: UserRole = currentRole || 'artisan';
      if (lower.includes('buyer') || lower.includes('ananya')) targetRole = 'buyer';
      else if (lower.includes('supplier') || lower.includes('ramesh')) targetRole = 'supplier';
      else if (lower.includes('delivery') || lower.includes('kavitha')) targetRole = 'delivery';
      else if (lower.includes('admin') || lower.includes('swaminathan')) targetRole = 'admin';
      else if (lower.includes('artisan') || lower.includes('meenakshi')) targetRole = 'artisan';

      login(targetRole, username.includes('@') ? username.split('@')[0] : username);
    }, 400);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      showToast('error', 'Email Required', 'Please enter your email to receive recovery instructions.');
      return;
    }
    showToast(
      'success',
      'Recovery Instructions Sent',
      `A secure password reset link has been dispatched to ${resetEmail}. Check your inbox!`
    );
    setIsForgotPasswordOpen(false);
    setResetEmail('');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden select-none bg-[#050819] text-white p-3 sm:p-6">
      {/* 1. Procedural Glassmorphism Background: Deep indigo, flowing 3D ribbons, ambient glows & Indian artisan motifs around edges (NO screenshot, NO duplicate card) */}
      <GlassmorphismBackground variant="elaborate" />

      {/* 2. Top-Left Page Brand Mark: ArtisanIQ Logo & Tagline */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-20 flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
        {/* Stylized Gradient Chevron 'A' */}
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pageTopLogoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="35%" stopColor="#FB7185" />
              <stop offset="70%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            d="M 12 37 L 24 10 L 36 37"
            stroke="url(#pageTopLogoGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap">
              Artisan<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-extrabold">IQ</span>
            </span>
            <span className="text-pink-400 text-xs sm:text-sm ml-0.5 -mt-1.5 leading-none select-none drop-shadow-[0_0_8px_#f43f5e]">
              ✦
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-300 tracking-wider whitespace-nowrap -mt-0.5">
            Crafts • Insights • Opportunities
          </span>
        </div>
      </div>

      {/* 3. ONLY ONE Perfectly Centered Glassmorphism Login Card */}
      <div className="relative z-20 w-full max-w-[390px] sm:max-w-[420px] my-auto">
        <div className="login-glass-card p-6 sm:p-8 text-center w-full relative">
          {/* Flowing Iridescent Liquid-Glass Ribbon Border (Exact from Reference Image 2) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none rounded-[28px] overflow-visible z-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="liquidRibbonBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="12%" stopColor="#38BDF8" stopOpacity="0.95" />
                <stop offset="28%" stopColor="#818CF8" stopOpacity="0.9" />
                <stop offset="48%" stopColor="#C084FC" stopOpacity="0.95" />
                <stop offset="68%" stopColor="#F472B6" stopOpacity="0.95" />
                <stop offset="84%" stopColor="#FB7185" stopOpacity="0.9" />
                <stop offset="94%" stopColor="#38BDF8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
              </linearGradient>
              <filter id="ribbonNeonHalo" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing Neon Ribbon Halo */}
            <rect
              x="1.5"
              y="1.5"
              width="calc(100% - 3px)"
              height="calc(100% - 3px)"
              rx="28"
              stroke="url(#liquidRibbonBorderGrad)"
              strokeWidth="4"
              opacity="0.6"
              filter="url(#ribbonNeonHalo)"
            />

            {/* Razor-Sharp Liquid-Glass Specular Crest */}
            <rect
              x="1.5"
              y="1.5"
              width="calc(100% - 3px)"
              height="calc(100% - 3px)"
              rx="28"
              stroke="url(#liquidRibbonBorderGrad)"
              strokeWidth="2.5"
              opacity="0.95"
            />
          </svg>

          {/* Card Content Layer */}
          <div className="relative z-10">
            {/* Card Centered Logo */}
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_12px_rgba(236,72,153,0.45)]"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="cardInternalLogoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="35%" stopColor="#FB7185" />
                      <stop offset="70%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 12 37 L 24 10 L 36 37"
                    stroke="url(#cardInternalLogoGrad)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Artisan<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-extrabold">IQ</span>
                  </span>
                  <span className="text-pink-400 text-sm ml-0.5 -mt-2 select-none drop-shadow-[0_0_8px_#f43f5e]">
                    ✦
                  </span>
                </div>
              </div>

              <span className="text-[10px] sm:text-[11px] font-medium text-slate-300 tracking-wider">
                Crafts • Insights • Opportunities
              </span>
            </div>

          {/* Heading & Subtitle */}
          <div className="mb-5">
            <h1 className="text-2xl sm:text-[27px] font-bold text-white tracking-tight">
              {isSignUpMode ? 'Join ArtisanIQ' : 'Welcome Back!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
              {isSignUpMode ? 'Empower your handmade craft journey today.' : 'Your craft journey starts here.'}
            </p>
          </div>

          {/* Functional Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
            {/* Input 1: Username or Email */}
            <div className="space-y-1">
              <div className="login-glass-input flex items-center px-3.5 py-2.5 sm:py-3 gap-3">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 shrink-0" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or Email"
                  required
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Input 2: Password with Show/Hide Toggle */}
            <div className="space-y-1">
              <div className="login-glass-input flex items-center px-3.5 py-2.5 sm:py-3 gap-3">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-300" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer ${
                    rememberMe
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                      : 'bg-[#0A1236]/80 border-sky-400/40'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <span className="text-slate-200 font-medium">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-indigo-300 hover:text-cyan-300 transition-colors font-medium cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Glowing Gradient Button: Magenta-Violet to Electric-Cyan with `→ Login` */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="login-gradient-btn w-full py-3 sm:py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
                  <span>{isSignUpMode ? 'Create Account' : 'Login'}</span>
                </>
              )}
            </button>

            {/* Divider: "or" */}
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-white/15" />
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">
                or
              </span>
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-xs sm:text-sm text-slate-300">
              <span>
                {isSignUpMode ? 'Already have an account? ' : "Don't have an account? "}
              </span>
              <button
                type="button"
                onClick={() => setIsSignUpMode(!isSignUpMode)}
                className="text-cyan-300 hover:text-white font-semibold underline underline-offset-2 transition-colors cursor-pointer ml-1"
              >
                {isSignUpMode ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md login-glass-card p-6 sm:p-7 text-left border border-white/20">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <KeyRound className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Reset Password</h3>
                  <p className="text-xs text-slate-400">We'll send recovery instructions</p>
                </div>
              </div>
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your registered ArtisanIQ email address below. We will send you an OTP and password recovery link.
              </p>

              <div className="login-glass-input flex items-center px-3.5 py-2.5 gap-3">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="artisan@artisaniq.in"
                  required
                  className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="login-gradient-btn px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
