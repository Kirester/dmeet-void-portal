import React, { ReactNode } from 'react';

interface TerminalWrapperProps {
  children: ReactNode;
}

export function TerminalWrapper({ children }: TerminalWrapperProps) {
  return (
    <div className="min-h-screen w-full bg-void text-phosphor p-4 sm:p-8 flex flex-col scanlines relative">
      {/* CRT Flicker Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-phosphor opacity-[0.02] animate-pulse"></div>
      
      {/* Terminal Border */}
      <div className="flex-1 border border-phosphor glow-box flex flex-col relative z-10">
        
        {/* ASCII Header */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-void px-4 text-phosphor glow-text whitespace-nowrap text-sm sm:text-base font-bold tracking-widest">
          [+--- D-MEET_SECURE_ACCESS ---+]
        </div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-phosphor"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-phosphor"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-phosphor"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-phosphor"></div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
