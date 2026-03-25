"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export const LoginModal = ({ isOpen, onClose, onSwitchToSignup }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        onClose();
        window.location.reload(); // Refresh to sync session
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-900"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-[#1a4332] rounded-2xl mx-auto flex items-center justify-center p-2.5 mb-6 shadow-lg shadow-[#1a4332]/20">
              <img src="/logo.png" alt="K" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h2>
            <p className="text-neutral-500 font-light">Sign in to access your heritage collection</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#1a4332] transition-colors" size={18} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#1a4332] focus:bg-white transition-all text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#1a4332] transition-colors" size={18} />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-[#1a4332] focus:bg-white transition-all text-neutral-900"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a4332] text-white font-bold py-4 rounded-2xl hover:bg-[#143528] transition-all shadow-xl shadow-[#1a4332]/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-8 text-neutral-500 font-light">
            Don't have an account?{" "}
            <button 
              onClick={onSwitchToSignup}
              className="text-[#1a4332] font-bold hover:underline"
            >
              Sign Up Free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
