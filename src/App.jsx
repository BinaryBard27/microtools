import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JsonFormatter from './pages/JsonFormatter';
import JwtDecoder from './pages/JwtDecoder';
import Base64 from './pages/Base64';
import CaseConverter from './pages/CaseConverter';
import WordCounter from './pages/WordCounter';
import PasswordGenerator from './pages/PasswordGenerator';
import ColorConverter from './pages/ColorConverter';
import QrGenerator from './pages/QrGenerator';
import ImageCompressor from './pages/ImageCompressor';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/base64" element={<Base64 />} />
            <Route path="/case-converter" element={<CaseConverter />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/color-converter" element={<ColorConverter />} />
            <Route path="/qr-generator" element={<QrGenerator />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
