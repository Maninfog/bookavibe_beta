
import React from 'react';
import { Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-tech-purple" />
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-tech-purple">Vibe</span>
              <span className="text-tech-blue">Generator</span>
              <span className="text-xs ml-1 bg-tech-purple text-white px-1.5 py-0.5 rounded font-mono">v1.0</span>
            </h1>
          </div>
          <div className="hidden md:flex space-x-4 text-sm font-medium">
            <a href="#" className="text-foreground/70 hover:text-tech-purple transition-colors">About</a>
            <a href="#" className="text-foreground/70 hover:text-tech-purple transition-colors">How it works</a>
            <a href="#" className="text-foreground/70 hover:text-tech-purple transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
