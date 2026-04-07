import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import './ToolPageLayout.css';

const JwtDecoder = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token.trim()) { setHeader(''); setPayload(''); setError(''); return; }
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('JWT must have 3 parts (header.payload.signature)');
      const decode = str => {
        let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const pad = b64.length % 4;
        if (pad === 1) throw new Error('Invalid Base64Url');
        if (pad) b64 += '='.repeat(4 - pad);
        return JSON.parse(decodeURIComponent(escape(atob(b64))));
      };
      setHeader(JSON.stringify(decode(parts[0]), null, 2));
      setPayload(JSON.stringify(decode(parts[1]), null, 2));
      setError('');
    } catch (e) { setHeader(''); setPayload(''); setError(e.message || 'Invalid JWT'); }
  }, [token]);

  return (
    <div className="tool-page">
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><ShieldCheck size={22} /></div>
            <h1>JWT Decoder</h1>
          </div>
          <p className="tool-page-desc">Securely decode JSON Web Tokens in your browser. Zero data sent to any server.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <span className="panel-label">Encoded JWT</span>
              <textarea className="input" value={token} onChange={e => setToken(e.target.value)}
                placeholder="Paste your JWT here  (e.g. eyJhbGci...)" style={{ minHeight: 120, wordBreak: 'break-all' }} />
            </div>
            {error && <div className="error-bar"><AlertCircle size={16} />{error}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <span className="panel-label" style={{ color: 'var(--brand)' }}>Header</span>
                <textarea className="input" value={header} readOnly placeholder="Decoded header..." style={{ minHeight: 200 }} />
              </div>
              <div>
                <span className="panel-label" style={{ color: 'var(--success)' }}>Payload</span>
                <textarea className="input" value={payload} readOnly placeholder="Decoded payload..." style={{ minHeight: 340 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JwtDecoder;
