import React from 'react';
import { Helmet } from 'react-helmet-async';
//, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, UploadCloud, Download, ArrowRight } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import './ToolPageLayout.css';

const fmt = bytes => {
  if (!bytes) return '0 B';
  const units = ['B','KB','MB','GB'], i = Math.floor(Math.log(bytes)/Math.log(1024));
  return `${(bytes/Math.pow(1024,i)).toFixed(1)} ${units[i]}`;
};

const ImageCompressor = () => {
  const [original, setOriginal] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [maxMB, setMaxMB] = useState(1);
  const [maxDim, setMaxDim] = useState(1920);

  const onUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    setOriginalFile(file);
    setOriginal(URL.createObjectURL(file));
    setCompressed(null); setCompressedFile(null);
  };

  const onDrop = useCallback(e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalFile(file);
      setOriginal(URL.createObjectURL(file));
      setCompressed(null); setCompressedFile(null);
    }
  }, []);

  const compress = async () => {
    if (!originalFile) return;
    setCompressing(true);
    try {
      const blob = await imageCompression(originalFile, { maxSizeMB: maxMB, maxWidthOrHeight: maxDim, useWebWorker: true });
      setCompressedFile(blob);
      setCompressed(URL.createObjectURL(blob));
    } catch { alert('Compression failed'); }
    finally { setCompressing(false); }
  };

  const download = () => {
    if (!compressedFile) return;
    const a = document.createElement('a');
    a.href = compressed; a.download = `compressed_${originalFile.name}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const savings = compressedFile && originalFile
    ? Math.round((1 - compressedFile.size / originalFile.size) * 100) : 0;

  return (
    <div className="tool-page">
      <Helmet>
        <title>Image Compressor - MicroTools</title>
        <meta name="description" content="Compress and resize images locally in your browser without quality loss." />
      </Helmet>
      <div className="tool-page-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={14} /> All Tools</Link>
          <div className="tool-page-title">
            <div className="tool-page-icon"><ImageIcon size={22} /></div>
            <h1>Image Compressor</h1>
          </div>
          <p className="tool-page-desc">Compress images locally in your browser. Supports JPG, PNG, and WebP. No upload to servers.</p>
        </div>
      </div>
      <div className="tool-body">
        <div className="container">
          <div className="tool-workspace fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {/* Left: Upload + Settings */}
              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Drop zone */}
                <div
                  onDrop={onDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => document.getElementById('img-input').click()}
                  style={{
                    border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)',
                    padding: '40px 20px', textAlign: 'center', cursor: 'pointer',
                    transition: 'all 0.15s', background: 'var(--surface)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <UploadCloud size={40} color="var(--brand)" style={{ marginBottom: 12, opacity: 0.7 }} />
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>Click or drag to upload</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>JPG, PNG, WebP supported</p>
                  <input id="img-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={onUpload} />
                </div>

                {originalFile && (
                  <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
                    <p style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.9rem' }}>Settings</p>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>Max Size</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand)' }}>{maxMB} MB</span>
                      </div>
                      <input type="range" min="0.1" max="5" step="0.1" value={maxMB} onChange={e => setMaxMB(+e.target.value)} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>Max Dimension</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand)' }}>{maxDim}px</span>
                      </div>
                      <input type="range" min="500" max="4000" step="100" value={maxDim} onChange={e => setMaxDim(+e.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={compress} disabled={compressing} style={{ width: '100%', justifyContent: 'center' }}>
                      {compressing ? 'Compressing…' : 'Compress Image'}
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Before / After */}
              <div style={{ flex: '2 1 420px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'start' }}>
                {/* Original */}
                <div>
                  <span className="panel-label">Original</span>
                  <div style={{
                    background: 'var(--surface)', border: '1.5px solid var(--border)',
                    borderRadius: 'var(--radius)', height: 260,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                  }}>
                    {original
                      ? <img src={original} alt="Original" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      : <span style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>No image</span>}
                  </div>
                  {originalFile && <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: 8, textAlign: 'center' }}>{fmt(originalFile.size)}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 32 }}>
                  <ArrowRight size={20} color="var(--text-3)" />
                </div>

                {/* Compressed */}
                <div>
                  <span className="panel-label">Compressed</span>
                  <div style={{
                    background: 'var(--surface)',
                    border: `1.5px solid ${compressed ? 'var(--success)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)', height: 260,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                  }}>
                    {compressed
                      ? <img src={compressed} alt="Compressed" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      : <span style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>Awaiting compression</span>}
                  </div>
                  {compressedFile && (
                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 700 }}>
                        {fmt(compressedFile.size)} <span style={{ opacity: 0.7 }}>(-{savings}%)</span>
                      </p>
                      <button className="btn btn-primary" onClick={download} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                        <Download size={14} />Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
