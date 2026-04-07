import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Type, Trash2 } from 'lucide-react';
import './ToolPageLayout.css';

const Stat = ({ value, label, color }) => (
  <div style={{
    background: 'var(--surface)', border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '20px 16px', textAlign: 'center',
  }}>
    <div style={{ fontSize: '2rem', fontWeight: 800, color: color || 'var(--brand)', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
  </div>
);

const WordCounter = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const topWords = (() => {
    if (!text.trim()) return [];
    const counts = {};
    (text.toLowerCase().match(/\b\w{3,}\b/g) || []).forEach(w => counts[w] = (counts[w] || 0) + 1);
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  })();

  return (
    <div className="tool-page">
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><Type size={22} /></div>
            <h1>Word & Text Analyzer</h1>
          </div>
          <p className="tool-page-desc">Count words, characters, sentences, and analyze your text in real time.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
              <Stat value={words} label="Words" />
              <Stat value={chars} label="Characters" color="var(--text)" />
              <Stat value={charsNoSpaces} label="No Spaces" color="var(--text-2)" />
              <Stat value={sentences} label="Sentences" color="#7c3aed" />
              <Stat value={paragraphs} label="Paragraphs" color="var(--warning)" />
              <Stat value={`~${readTime}m`} label="Read Time" color="var(--success)" />
            </div>

            <textarea className="input" value={text} onChange={e => setText(e.target.value)}
              placeholder="Type or paste your text here to analyze..." style={{ minHeight: 260 }} autoFocus />

            {topWords.length > 0 && (
              <div>
                <span className="panel-label">Top Keywords</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                  {topWords.map(([word, count]) => (
                    <span key={word} style={{
                      background: 'var(--brand-light)', color: 'var(--brand)',
                      border: '1px solid var(--brand-mid)',
                      padding: '4px 10px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 600,
                    }}>
                      {word} <span style={{ opacity: 0.6 }}>×{count}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="workspace-footer" style={{ marginTop: 0 }}>
              <span className="workspace-stats">Approx. {readTime} min read at 200 wpm</span>
              <button className="btn btn-ghost" onClick={() => setText('')}><Trash2 size={15} />Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
