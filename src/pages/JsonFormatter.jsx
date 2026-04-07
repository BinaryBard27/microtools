import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileJson, Copy, Minimize2, Maximize2, Trash2, AlertCircle } from 'lucide-react';
import './ToolPageLayout.css';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      if (!input.trim()) { setOutput(''); setError(''); return; }
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
      setError('');
    } catch (e) { setError(e.message); setOutput(''); }
  };

  const minify = () => {
    try {
      if (!input.trim()) return;
      setOutput(JSON.stringify(JSON.parse(input)));
      setError('');
    } catch (e) { setError(e.message); setOutput(''); }
  };

  const copy = () => navigator.clipboard.writeText(output || input);
  const clear = () => { setInput(''); setOutput(''); setError(''); };

  return (
    <div className="tool-page">
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><FileJson size={22} /></div>
            <h1>JSON Formatter & Validator</h1>
          </div>
          <p className="tool-page-desc">Format, beautify, and validate JSON data instantly in your browser.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up">
            <div className="toolbar">
              <button className="btn btn-primary" onClick={format}><Maximize2 size={15} />Format</button>
              <button className="btn btn-ghost" onClick={minify}><Minimize2 size={15} />Minify</button>
              <button className="btn btn-ghost" onClick={copy} disabled={!output}><Copy size={15} />Copy Result</button>
              <button className="btn btn-ghost" onClick={clear}><Trash2 size={15} />Clear</button>
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 45%', minWidth: 240 }}>
                <span className="panel-label">Input JSON</span>
                <textarea className="input" value={input} onChange={e => setInput(e.target.value)}
                  placeholder={'{\n  "paste": "your JSON here"\n}'} style={{ minHeight: 420 }} />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: 240 }}>
                <span className="panel-label">Output</span>
                <textarea className="input" value={output} readOnly
                  placeholder="Formatted result will appear here..."
                  style={{ minHeight: 420, borderColor: error ? 'var(--danger)' : undefined }} />
              </div>
            </div>
            {error && (
              <div className="error-bar"><AlertCircle size={16} /><strong>Invalid JSON:</strong> {error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
