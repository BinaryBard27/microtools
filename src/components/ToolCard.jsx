import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './ToolCard.css';

const ToolCard = ({ title, description, icon: Icon, to, delay, tag }) => (
  <Link
    to={to}
    className="tool-card fade-up"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <div className="card-icon-wrap">
      <Icon size={22} />
    </div>
    <div>
      <h3 className="card-title">{title}</h3>
    </div>
    <p className="card-desc">{description}</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
      {tag && <span className="card-tag">{tag}</span>}
      <ArrowUpRight size={18} className="card-arrow" style={{ marginLeft: 'auto' }} />
    </div>
  </Link>
);

export default ToolCard;
