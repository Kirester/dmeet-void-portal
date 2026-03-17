/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SupabaseAuth } from './components/SupabaseAuth';
import { Dashboard } from './components/Dashboard';
import { TerminalWrapper } from './components/TerminalWrapper';
import { supabase } from './lib/supabase';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Supabase auth error:", error.message);
      }
      setIsAuthenticated(!!session);
      setLoading(false);
    }).catch((err) => {
      console.error("Supabase connection error:", err);
      setIsAuthenticated(false);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    let subscription: any;
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });
      subscription = data.subscription;
    } catch (err) {
      console.error("Supabase onAuthStateChange error:", err);
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/$/, '') || 'https://gbyahwkujpndvzfgumdj.supabase.co';
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() || 'sb_publishable_60F_LqUfAJ6vihSk5F4dYw_8FHU-M0d';
  
  if (!supabaseUrl || !supabaseKey) {
    return (
      <TerminalWrapper>
        <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
          <div className="text-red-500 font-mono mb-4 border border-red-500 p-4 bg-red-500/10">
            [ ERR_MISSING_CREDENTIALS ]
            <br /><br />
            Supabase connection failed. You need to connect your Supabase project.
            <br /><br />
            1. Open Settings (gear icon)
            <br />
            2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
            <br />
            3. Restart the dev server
          </div>
        </div>
      </TerminalWrapper>
    );
  }

  if (loading) {
    return (
      <TerminalWrapper>
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-phosphor glow-text font-mono animate-pulse">
            INITIALIZING_SYSTEM...
          </div>
        </div>
      </TerminalWrapper>
    );
  }

  return (
    <TerminalWrapper>
      {isAuthenticated ? (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <SupabaseAuth onSuccess={() => setIsAuthenticated(true)} />
      )}
    </TerminalWrapper>
  );
}
