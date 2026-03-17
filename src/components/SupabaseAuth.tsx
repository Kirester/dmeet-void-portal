import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface SupabaseAuthProps {
  onSuccess: () => void;
}

export function SupabaseAuth({ onSuccess }: SupabaseAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (authError) throw authError;
      }
      onSuccess();
    } catch (err: any) {
      let errorMessage = err.message || 'Authentication failed';
      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'Failed to connect to Supabase. Your project might be paused, deleted, or the URL is incorrect.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto">
      <div className="w-full border border-phosphor-dark p-6 bg-void relative glow-box">
        {/* Terminal Header */}
        <div className="border-b border-phosphor-dark pb-2 mb-6 flex justify-between items-center">
          <span className="text-phosphor glow-text font-bold tracking-widest uppercase">
            {isLogin ? 'AUTH_INIT::LOGIN' : 'AUTH_INIT::REGISTER'}
          </span>
          <span className="text-phosphor-dark text-xs">v1.0.0</span>
        </div>

        {error && (
          <div className="mb-6 p-2 border border-red-500/50 bg-red-500/10 text-red-500 text-sm font-mono">
            ERR:: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="group">
            <label className="block text-phosphor-dark mb-1 text-sm uppercase tracking-wider">
              IDENTIFIER (EMAIL)
            </label>
            <div className="flex items-center text-phosphor bg-transparent border-none outline-none w-full">
              <span className="mr-2 text-phosphor-dark select-none">user@void:~$</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                className="bg-transparent border-none outline-none flex-1 text-phosphor placeholder-phosphor-dark/50 font-mono"
                placeholder="enter_email..."
                required
                disabled={loading}
              />
              {focusedInput === 'email' && <span className="animate-blink ml-1">█</span>}
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <label className="block text-phosphor-dark mb-1 text-sm uppercase tracking-wider">
              CREDENTIAL (PASSWORD)
            </label>
            <div className="flex items-center text-phosphor bg-transparent border-none outline-none w-full">
              <span className="mr-2 text-phosphor-dark select-none">user@void:~$</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className="bg-transparent border-none outline-none flex-1 text-phosphor placeholder-phosphor-dark/50 font-mono"
                placeholder="enter_password..."
                required
                disabled={loading}
              />
              {focusedInput === 'password' && <span className="animate-blink ml-1">█</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-phosphor-dark mt-8">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-phosphor-dark hover:text-phosphor hover:glow-text transition-colors duration-200 uppercase tracking-widest text-sm focus:outline-none"
              disabled={loading}
            >
              {isLogin ? '&gt; SWITCH_TO_REGISTER' : '&gt; SWITCH_TO_LOGIN'}
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="text-phosphor font-bold hover:bg-phosphor hover:text-void transition-all duration-200 px-4 py-2 uppercase tracking-widest focus:outline-none glow-text hover:glow-box disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-phosphor"
            >
              [ {loading ? 'EXECUTING...' : isLogin ? 'EXECUTE_LOGIN' : 'EXECUTE_REGISTER'} ]
            </button>
          </div>
        </form>
      </div>

      {/* System Status */}
      <div className="mt-8 text-phosphor-dark text-xs flex gap-4">
        <span>STATUS: <span className="text-phosphor animate-pulse">ONLINE</span></span>
        <span>|</span>
        <span>ENCRYPTION: <span className="text-phosphor">ACTIVE</span></span>
      </div>
    </div>
  );
}
