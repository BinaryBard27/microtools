const fs = require('fs');
const path = require('path');

const files = [
  { name: 'QrGenerator', title: 'QR Code Generator - MicroTools', desc: 'Generate custom, downloadable QR codes for any URL or text instantly.' },
  { name: 'JsonFormatter', title: 'JSON Formatter & Validator - MicroTools', desc: 'Format, beautify, and validate JSON data instantly in your browser.' },
  { name: 'JwtDecoder', title: 'JWT Decoder - MicroTools', desc: 'Decode JSON Web Tokens securely in your browser without sending data to a server.' },
  { name: 'ImageCompressor', title: 'Image Compressor - MicroTools', desc: 'Compress and resize images locally in your browser without quality loss.' },
  { name: 'WordCounter', title: 'Word & Character Counter - MicroTools', desc: 'Count words, characters, sentences and calculate reading time instantly.' },
  { name: 'Base64', title: 'Base64 Encoder / Decoder - MicroTools', desc: 'Encode and decode Base64 strings quickly and securely in your browser.' },
  { name: 'PasswordGenerator', title: 'Secure Password Generator - MicroTools', desc: 'Generate strong, randomly secure passwords using client-side cryptography.' },
  { name: 'ColorConverter', title: 'Color Converter - MicroTools', desc: 'Convert colors between HEX, RGB, HSL and see previews instantly.' },
  { name: 'CaseConverter', title: 'Text Case Converter - MicroTools', desc: 'Convert text between camelCase, snake_case, PascalCase and more instantly.' }
];

const basePath = path.join(__dirname, 'src', 'pages');

for (const {name, title, desc} of files) {
  const fPath = path.join(basePath, name + '.jsx');
  if (!fs.existsSync(fPath)) {
      console.log("Missing", fPath);
      continue;
  }
  let content = fs.readFileSync(fPath, 'utf8');
  
  if (!content.includes('react-helmet-async')) {
      content = content.replace("import React", "import React from 'react';\nimport { Helmet } from 'react-helmet-async';\n//");
      if(!content.includes('import { Helmet }')) {
            content = "import { Helmet } from 'react-helmet-async';\n" + content;
      }

      // We find the first return ( <div ...> block and inject Helmet
      const returnRegex = /(return\s*\(\s*<[a-zA-Z]+[^>]*>)/;
      if (returnRegex.test(content)) {
          content = content.replace(returnRegex, 
              `$1\n      <Helmet>\n        <title>${title}</title>\n        <meta name="description" content="${desc}" />\n      </Helmet>`);
          fs.writeFileSync(fPath, content);
          console.log("Updated", name);
      } else {
          console.log("Could not find insertion point for", name);
      }
  } else {
      console.log("Already updated", name);
  }
}
