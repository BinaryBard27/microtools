import React, { useState } from 'react';
import ToolCard from '../components/ToolCard';
import {
  FileJson, Key, Hash, CaseSensitive, Type,
  Image as ImageIcon, Palette, QrCode, ShieldCheck,
  CheckCircle2, Lock, Zap
} from 'lucide-react';
import './Home.css';

const tools = [
  {
    id: 'json-formatter', title: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data instantly. Supports minify and syntax error detection.',
    icon: FileJson, to: '/json-formatter', tag: 'Developer',
  },
  {
    id: 'jwt-decoder', title: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens — header, payload, and claims — without sending data anywhere.',
    icon: ShieldCheck, to: '/jwt-decoder', tag: 'Security',
  },
  {
    id: 'image-compressor', title: 'Image Compressor',
    description: 'Compress and resize images client-side. Supports JPG, PNG, and WebP with quality controls.',
    icon: ImageIcon, to: '/image-compressor', tag: 'Media',
  },
  {
    id: 'word-counter', title: 'Text Analyzer',
    description: 'Count words, characters, sentences, and get reading time estimates and keyword frequency.',
    icon: Type, to: '/word-counter', tag: 'Writing',
  },
  {
    id: 'base64', title: 'Base64 Encoder / Decoder',
    description: 'Quickly encode plain text to Base64 or decode Base64 strings back to readable content.',
    icon: Hash, to: '/base64', tag: 'Developer',
  },
  {
    id: 'password-generator', title: 'Password Generator',
    description: 'Generate strong, cryptographically random passwords with custom length and character sets.',
    icon: Key, to: '/password-generator', tag: 'Security',
  },
  {
    id: 'color-converter', title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats with a live preview picker.',
    icon: Palette, to: '/color-converter', tag: 'Design',
  },
  {
    id: 'qr-generator', title: 'QR Code Generator',
    description: 'Instantly generate downloadable QR codes for any URL or text, with color customization.',
    icon: QrCode, to: '/qr-generator', tag: 'Utility',
  },
  {
    id: 'case-converter', title: 'Case Converter',
    description: 'Transform text between UPPERCASE, lowercase, Title Case, Sentence case, and aLtErNaTiNg.',
    icon: CaseSensitive, to: '/case-converter', tag: 'Writing',
  },
];

const TAGS = ['All', 'Developer', 'Security', 'Media', 'Writing', 'Design', 'Utility'];

const Home = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? tools : tools.filter(t => t.tag === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero fade-up">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-eyebrow">
            <Zap size={11} />
            Free · Private · No Login
          </div>
          <h1 className="hero-title">
            Every tool you need,<br /><em>right in your browser</em>
          </h1>
          <p className="hero-subtitle">
            Lightning-fast micro tools for developers, designers, and writers.
            All processing happens locally — nothing leaves your device.
          </p>
          <div className="hero-badges">
            <div className="hero-badge"><CheckCircle2 size={14} />100% Private</div>
            <div className="hero-badge"><Lock size={14} />No Login Required</div>
            <div className="hero-badge"><Zap size={14} />Instant Results</div>
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="tools-section">
        <div className="container">
          <div className="tools-toolbar">
            <div className="tools-toolbar-left">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  className={`filter-btn${active === tag ? ' active' : ''}`}
                  onClick={() => setActive(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <span className="tools-count">{filtered.length} tool{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="tools-grid">
            {filtered.map((tool, i) => (
              <ToolCard key={tool.id} {...tool} delay={i * 40} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">Micro<span>Tools</span></div>
          <p className="footer-copy">
            All tools run locally in your browser. No data is collected or transmitted.
          </p>
          <p className="footer-copy">Built with React + Vite</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
