import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Key, Copy, RefreshCw, CheckCircle2 } from 'lucide-react';
import './ToolPageLayout.css';

const StrengthBar = ({ password }) => {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#059669'];
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 99,
            background: i <= score ? colors[score] : 'var(--border)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      {score > 0 && <span style={{ fontSize: '0.78rem', fontWeight: 600, color: colors[score] }}>{labels[score]}</span>}
    </div>
  );
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charset = '';
    if (opts.lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (opts.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (opts.numbers) charset += '0123456789';
    if (opts.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!charset) { setPassword('Select at least one character type.'); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, n => charset[n % charset.length]).join(''));
  };

  useEffect(() => { generate(); }, [length, opts]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const toggle = key => setOpts(o => ({ ...o, [key]: !o[key] }));

  return (
    <div className="tool-page">
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><Key size={22} /></div>
            <h1>Password Generator</h1>
          </div>
          <p className="tool-page-desc">Generate cryptographically strong passwords with custom length and character sets.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up" style={{ maxWidth: 580, margin: '0 auto' }}>
            {/* Password display */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              background: 'var(--surface)', border: '1.5px solid var(--brand-mid)',
              borderRadius: 'var(--radius)', padding: '18px 20px', marginBottom: 8,
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem',
                wordBreak: 'break-all', flex: 1, color: 'var(--text)', lineHeight: 1.5,
              }}>
                {password}
              </span>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button className="btn btn-ghost" onClick={generate} style={{ padding: '8px 10px' }}>
                  <RefreshCw size={16} />
                </button>
                <button className={`btn ${copied ? 'btn-primary' : 'btn-ghost'}`} onClick={copy} style={{ padding: '8px 10px' }}>
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            <StrengthBar password={password} />

            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-2)' }}>Length</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand)' }}>{length}</span>
                </div>
                <input type="range" min="4" max="64" value={length} onChange={e => setLength(+e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { key: 'upper', label: 'Uppercase (A–Z)' },
                  { key: 'lower', label: 'Lowercase (a–z)' },
                  { key: 'numbers', label: 'Numbers (0–9)' },
                  { key: 'symbols', label: 'Symbols (!@#…)' },
                ].map(({ key, label }) => (
                  <label key={key} style={{
                    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                    background: opts[key] ? 'var(--brand-light)' : 'var(--surface)',
                    border: `1.5px solid ${opts[key] ? 'var(--brand-mid)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)', padding: '12px 14px',
                    fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.15s',
                  }}>
                    <input type="checkbox" checked={opts[key]} onChange={() => toggle(key)} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
