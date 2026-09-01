import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex">
      {/* Left Panel — Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 flex-col">
        <img
          src="https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80"
          alt="Kashmir"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        
        <div className="relative flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl">W</span>
            </div>
            <span className="text-white font-black text-2xl">WAYVO</span>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-md">
              <p className="text-brand-red font-semibold text-sm mb-3 tracking-wide uppercase">Travel your way</p>
              <h2 className="text-5xl font-black text-white leading-tight mb-6">
                Every journey<br />starts here.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Build personalized trips, adapt in real time, and experience the future of travel — all from one platform.
              </p>

              {/* Feature bullets */}
              <div className="mt-8 space-y-3">
                {[
                  'AI-powered personalized trip planning',
                  'Dynamic itinerary adaptation',
                  'Real-time tour operations',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-brand-red/20 border border-brand-red/40 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                    </div>
                    <span className="text-white/80 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom quote */}
          <p className="text-white/40 text-sm">
            "From dream to destination — intelligently planned."
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-xl">W</span>
          </div>
          <span className="font-black text-2xl text-gray-900">WAYVO</span>
        </div>

        <div className="w-full max-w-md">
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            {tab === 'login' ? 'Welcome back 👋' : 'Create your account'}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {tab === 'login' ? 'Sign in to continue your journey' : 'Start planning your perfect trip today'}
          </p>

          {/* Demo Buttons — Most prominent */}
          <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 text-center">
              🚀 Hackathon Demo — Jump In
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleTravelerDemo}
                className="bg-brand-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors flex flex-col items-center gap-1"
              >
                <span>🧳</span>
                Continue as Traveler
              </button>
              <button
                onClick={handleOperatorDemo}
                className="bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex flex-col items-center gap-1"
              >
                <span>⚙️</span>
                Tour Operator
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-xs font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Tab Switch */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
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
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <button type="button" className="text-xs text-brand-red font-semibold hover:underline">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors mt-2">
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                  <input type="text" placeholder="Alison" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                  <input type="text" placeholder="Pinto" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input type="email" placeholder="alison.pinto@email.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input type="password" placeholder="••••••••" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Traveler', 'Tour Operator'].map(role => (
                    <label key={role} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-transparent hover:border-brand-red cursor-pointer transition-colors">
                      <input type="radio" name="role" className="accent-brand-red" defaultChecked={role === 'Traveler'} />
                      <span className="text-sm font-medium text-gray-700">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
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
