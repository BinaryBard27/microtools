import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Copy, CheckCircle2 } from 'lucide-react';
import './ToolPageLayout.css';

const hexToRgb = hex => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  return isNaN(r+g+b) ? null : { r, g, b };
};

const rgbToHsl = (r,g,b) => {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if (max===min) { h=s=0; } else {
    const d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}
    h/=6;
  }
  return { h:Math.round(h*360), s:Math.round(s*100), l:Math.round(l*100) };
};

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <button className="btn btn-ghost" onClick={copy} style={{ padding: '8px 12px', flexShrink: 0 }}>
      <Helmet>
        <title>Color Converter - MicroTools</title>
        <meta name="description" content="Convert colors between HEX, RGB, HSL and see previews instantly." />
      </Helmet>
      {copied ? <CheckCircle2 size={15} color="var(--success)" /> : <Copy size={15} />}
    </button>
  );
};

const Row = ({ label, value }) => (
  <div>
    <span className="panel-label">{label}</span>
    <div style={{ display: 'flex', gap: 8 }}>
      <input className="input" value={value} readOnly style={{ fontFamily: "'JetBrains Mono', monospace" }} />
      <CopyBtn text={value} />
    </div>
  </div>
);

const ColorConverter = () => {
  const [hex, setHex] = useState('#2563eb');

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '—';
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '—';
  const isValid = /^#([0-9A-F]{3}){1,2}$/i.test(hex);

  return (
    <div className="tool-page">
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><Palette size={22} /></div>
            <h1>Color Converter</h1>
          </div>
          <p className="tool-page-desc">Convert colors between HEX, RGB, and HSL formats with a live preview.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up" style={{ maxWidth: 540, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Color preview */}
            <div style={{
              height: 140, borderRadius: 'var(--radius-lg)',
              background: isValid ? hex : '#e2e8f0',
              border: '1.5px solid var(--border)',
              transition: 'background 0.2s',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', bottom: 12, left: 16,
                background: 'rgba(0,0,0,0.35)', color: '#fff',
                padding: '4px 10px', borderRadius: 99, fontSize: '0.78rem',
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
              }}>{isValid ? hex.toUpperCase() : 'Invalid'}</div>
            </div>

            {/* Hex input with picker */}
            <div>
              <span className="panel-label">HEX</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="input" value={hex} onChange={e => setHex(e.target.value)}
                  style={{ fontFamily: "'JetBrains Mono', monospace", borderColor: isValid ? undefined : 'var(--danger)' }}
                  placeholder="#000000" />
                <input type="color" value={isValid ? hex : '#2563eb'} onChange={e => setHex(e.target.value)}
                  style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border)', cursor: 'pointer', padding: 3, background: 'var(--bg)' }} />
                <CopyBtn text={hex} />
              </div>
            </div>

            <Row label="RGB" value={rgbStr} />
            <Row label="HSL" value={hslStr} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
