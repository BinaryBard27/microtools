import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CaseSensitive, Copy, Trash2 } from 'lucide-react';
import './ToolPageLayout.css';

const CaseConverter = () => {
  const [text, setText] = useState('');

  const convert = (type) => {
    const transforms = {
      upper: t => t.toUpperCase(),
      lower: t => t.toLowerCase(),
      title: t => t.toLowerCase().replace(/(?:^|\s|-|\/)(\w)/g, m => m.toUpperCase()),
      sentence: t => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, m => m.toUpperCase()),
      alternating: t => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
      camel: t => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
      snake: t => t.toLowerCase().replace(/\s+/g, '_'),
      kebab: t => t.toLowerCase().replace(/\s+/g, '-'),
    };
    if (transforms[type]) setText(transforms[type](text));
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const copy = () => navigator.clipboard.writeText(text);
  const clear = () => setText('');

  const buttons = [
    { id: 'upper', label: 'UPPERCASE' },
    { id: 'lower', label: 'lowercase' },
    { id: 'title', label: 'Title Case' },
    { id: 'sentence', label: 'Sentence case' },
    { id: 'alternating', label: 'aLtErNaTiNg' },
    { id: 'camel', label: 'camelCase' },
    { id: 'snake', label: 'snake_case' },
    { id: 'kebab', label: 'kebab-case' },
  ];

  return (
    <div className="tool-page">
      <Helmet>
        <title>Text Case Converter - MicroTools</title>
        <meta name="description" content="Convert text between camelCase, snake_case, PascalCase and more instantly." />
      </Helmet>
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><CaseSensitive size={22} /></div>
            <h1>Case Converter</h1>
          </div>
          <p className="tool-page-desc">Transform text between any case style instantly — includes camelCase and snake_case.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up">
            <div className="toolbar">
              {buttons.map(b => (
                <button key={b.id} className="btn btn-ghost" onClick={() => convert(b.id)}>{b.label}</button>
              ))}
            </div>
            <textarea className="input" value={text} onChange={e => setText(e.target.value)}
              placeholder="Type or paste your text here..." style={{ minHeight: 280 }} autoFocus />
            <div className="workspace-footer">
              <span className="workspace-stats">
                {text.length} chars · {wordCount} words
              </span>
              <div className="footer-actions">
                <button className="btn btn-ghost" onClick={copy}><Copy size={15} />Copy</button>
                <button className="btn btn-ghost" onClick={clear}><Trash2 size={15} />Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;
