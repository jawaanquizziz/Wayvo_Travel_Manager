import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-brand-red flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-brand-red font-black text-2xl">W</span>
          </div>
          <span className="text-white font-black text-5xl tracking-tight">WAYVO</span>
        </div>
        
        {/* Tagline */}
        <p className="text-white/80 text-lg font-medium text-center">
          Travel your way. Adapt as you go.
        </p>
        
        {/* Loader */}
        <div className="mt-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
