import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Luggage, ShieldCheck, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleTravelerDemo = () => navigate('/traveler');
  const handleOperatorDemo = () => navigate('/operator');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/traveler');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/traveler');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Panel — Hero Brand Image (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 flex-col">
        <img
          src="https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80"
          alt="Kashmir"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
        
        <div className="relative flex flex-col h-full p-12 justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red rounded-2xl flex items-center justify-center shadow-red">
              <span className="text-white font-black text-xl">W</span>
            </div>
            <span className="text-white font-black text-2xl tracking-tight">WAYVO</span>
          </div>

          {/* Center content */}
          <div className="max-w-md my-auto">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-red bg-red-500/10 border border-brand-red/30 px-3 py-1.5 rounded-full mb-4">
              <Sparkles size={13} />
              <span>Personalized Dynamic Travel</span>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-5">
              Every journey<br />starts here.
            </h2>
            
            <p className="text-white/80 text-base leading-relaxed mb-8">
              Personalized trips, live adaptive schedules, and real-time operator coordination in one unified system.
            </p>

            {/* Feature bullets with clean icons */}
            <div className="space-y-3">
              {[
                'AI-driven custom trip personalization',
                'Dynamic adaptation for delays & closures',
                'End-to-end tour operations control',
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-brand-red/20 border border-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full"></div>
                  </div>
                  <span className="text-white/90 text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <p className="text-white/50 text-xs font-medium">
            "Travel your way. Adapt as you go." — WAYVO
          </p>
        </div>
      </div>

      {/* Right Panel — Form & Demo Launchers */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-12 bg-white">
        {/* Mobile Header Logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 bg-brand-red rounded-2xl flex items-center justify-center shadow-red">
            <span className="text-white font-black text-xl">W</span>
          </div>
          <span className="font-black text-2xl text-gray-900 tracking-tight">WAYVO</span>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center sm:text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {tab === 'login' ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {tab === 'login' ? 'Sign in to access your itinerary or operations dashboard' : 'Join WAYVO to start planning custom trips'}
            </p>
          </div>

          {/* Instant Hackathon Demo Jump Buttons */}
          <div className="mb-6 p-4 sm:p-5 bg-red-50/70 rounded-3xl border border-red-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black text-brand-red uppercase tracking-wider">
                Instant Demo Access
              </span>
              <span className="text-[10px] bg-red-100 text-brand-red font-bold px-2 py-0.5 rounded-full">
                One-Click
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleTravelerDemo}
                className="bg-brand-red text-white py-3.5 px-3 rounded-2xl font-bold text-xs sm:text-sm hover:bg-red-700 transition-all flex flex-col items-center justify-center gap-1.5 shadow-xs"
              >
                <Luggage size={18} />
                <span>Traveler Portal</span>
              </button>
              <button
                onClick={handleOperatorDemo}
                className="bg-gray-900 text-white py-3.5 px-3 rounded-2xl font-bold text-xs sm:text-sm hover:bg-gray-800 transition-all flex flex-col items-center justify-center gap-1.5 shadow-xs"
              >
                <ShieldCheck size={18} />
                <span>Operator Console</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-6">
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alison.pinto@email.com"
                  className="input-field"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                  <button type="button" className="text-xs text-brand-red font-bold hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-red text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm hover:bg-red-700 transition-colors shadow-red mt-2">
                Sign In to WAYVO
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">First Name</label>
                  <input type="text" placeholder="Alison" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Last Name</label>
                  <input type="text" placeholder="Pinto" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email</label>
                <input type="email" placeholder="alison.pinto@email.com" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Password</label>
                <input type="password" placeholder="••••••••" className="input-field" />
              </div>
              <button type="submit" className="w-full bg-brand-red text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm hover:bg-red-700 transition-colors shadow-red">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
