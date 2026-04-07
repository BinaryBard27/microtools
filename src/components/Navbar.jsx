import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, GitBranch } from 'lucide-react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="container nav-inner">
      <Link to="/" className="brand">
        <div className="brand-icon-wrap">
          <Zap size={18} />
        </div>
        <span className="brand-name">Micro<span>Tools</span></span>
      </Link>
      <div className="nav-right">
        <a href="https://github.com/SHERWIN/micro-tools" target="_blank" rel="noreferrer" className="nav-github">
          <GitBranch size={16} />
          GitHub
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
