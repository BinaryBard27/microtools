import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Hash, Lock, Unlock, Copy, Trash2, AlertCircle } from 'lucide-react';
import './ToolPageLayout.css';

const Base64 = () => {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const encode = () => {
    try { setOutput(btoa(unescape(encodeURIComponent(text)))); setError(''); }
    catch { setError('Encoding failed. Ensure your text is valid UTF-8.'); setOutput(''); }
  };
  const decode = () => {
    try { setOutput(decodeURIComponent(escape(atob(text)))); setError(''); }
    catch { setError('Decoding failed. Ensure input is valid Base64.'); setOutput(''); }
  };
  const copy = () => navigator.clipboard.writeText(output);
  const clear = () => { setText(''); setOutput(''); setError(''); };

  return (
    <div className="tool-page">
      <Helmet>
        <title>Base64 Encoder / Decoder - MicroTools</title>
        <meta name="description" content="Encode and decode Base64 strings quickly and securely in your browser." />
      </Helmet>
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><Hash size={22} /></div>
            <h1>Base64 Encoder & Decoder</h1>
          </div>
          <p className="tool-page-desc">Encode text to Base64 or decode Base64 strings back to plain text.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up">
            <div>
              <span className="panel-label">Input</span>
              <textarea className="input" value={text} onChange={e => setText(e.target.value)}
                placeholder="Type or paste your input here..." style={{ minHeight: 160 }} />
            </div>
            <div className="toolbar" style={{ marginTop: 16 }}>
              <button className="btn btn-primary" onClick={encode}><Lock size={15} />Encode to Base64</button>
              <button className="btn btn-outline" onClick={decode}><Unlock size={15} />Decode from Base64</button>
            </div>
            <div style={{ marginTop: 16 }}>
              <span className="panel-label">Output</span>
              <textarea className="input" value={output} readOnly placeholder="Result will appear here..."
                style={{ minHeight: 160 }} />
            </div>
            {error && <div className="error-bar"><AlertCircle size={16} />{error}</div>}
            <div className="workspace-footer">
              <span className="workspace-stats">Output: {output.length} characters</span>
              <div className="footer-actions">
                <button className="btn btn-ghost" onClick={copy} disabled={!output}><Copy size={15} />Copy Result</button>
                <button className="btn btn-ghost" onClick={clear}><Trash2 size={15} />Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64;
