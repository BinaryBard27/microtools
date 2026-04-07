import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import './ToolPageLayout.css';

const QrGenerator = () => {
  const [text, setText] = useState('https://microtools.dev');
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState('#0f172a');
  const [bg, setBg] = useState('#ffffff');
  const qrRef = useRef();

  const download = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'qrcode.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="tool-page">
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><QrCode size={22} /></div>
            <h1>QR Code Generator</h1>
          </div>
          <p className="tool-page-desc">Generate custom, downloadable QR codes for any URL or text instantly.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flexWrap: 'wrap' }}>
            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <span className="panel-label">Content (URL or Text)</span>
                <textarea className="input" value={text} onChange={e => setText(e.target.value)}
                  placeholder="Enter URL or text..." rows={4} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Size</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand)' }}>{size}px</span>
                </div>
                <input type="range" min="128" max="512" step="32" value={size} onChange={e => setSize(+e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <span className="panel-label">Foreground</span>
                  <input type="color" value={fg} onChange={e => setFg(e.target.value)}
                    style={{ width: '100%', height: 44, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border)', cursor: 'pointer', padding: 3 }} />
                </div>
                <div>
                  <span className="panel-label">Background</span>
                  <input type="color" value={bg} onChange={e => setBg(e.target.value)}
                    style={{ width: '100%', height: 44, borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border)', cursor: 'pointer', padding: 3 }} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={download} style={{ justifyContent: 'center' }}>
                <Download size={16} />Download PNG
              </button>
            </div>

            {/* Preview */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)', minHeight: 300,
            }}>
              <div ref={qrRef} style={{ padding: 16, background: bg, borderRadius: 'var(--radius)' }}>
                <QRCodeCanvas value={text || ' '} size={Math.min(size, 280)} bgColor={bg} fgColor={fg} level="H" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
