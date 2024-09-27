import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import formidable from 'formidable';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure 'uploads' and 'compressed' directories exist
const uploadDir = path.join(__dirname, 'uploads');
const compressedDir = path.join(__dirname, 'compressed');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

if (!fs.existsSync(compressedDir)) {
    fs.mkdirSync(compressedDir);
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      console.log('Serving index.html');
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
        if (err) {
          console.error('Error loading index.html:', err);
          res.writeHead(500);
          res.end('Error loading index.html');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (req.url.startsWith('/compressed/')) {
      console.log(`Serving compressed image: ${req.url}`);
      fs.readFile(path.join(__dirname, req.url), (err, data) => {
        if (err) {
          console.error('Error serving compressed image:', err);
          res.writeHead(404);
          res.end('File not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      });
    } else {
      console.log('404 Not Found');
      res.writeHead(404);
      res.end('Not found');
    }
  } else if (req.method === 'POST' && req.url === '/upload') {
    console.log('Handling file upload');

    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.writeHead(500);
        res.end('Error parsing form');
        return;
      }

      const uploadedImagePath = files.image.filepath;
      const uploadPath = path.join(uploadDir, 'uploaded_image.jpg');

      fs.rename(uploadedImagePath, uploadPath, (err) => {
        if (err) {
          console.error('Error saving file:', err);
          res.writeHead(500);
          res.end('Error saving file');
          return;
        }
        console.log('File upload complete, starting compression');
        exec('gulp compress', (err) => {
          if (err) {
            console.error('Error compressing image:', err);
            res.writeHead(500);
            res.end('Error compressing image');
            return;
          }

          const oldPath = uploadPath;
          const newPath = path.join(compressedDir, 'uploaded_image.jpg');

          console.log('Checking file sizes');
          fs.stat(oldPath, (err, statsOld) => {
            if (err) {
              console.error('Error getting old file stats:', err);
              res.writeHead(500);
              res.end('Error processing old file');
              return;
            }
            fs.stat(newPath, (err, statsNew) => {
              if (err) {
                console.error('Error getting new file stats:', err);
                res.writeHead(500);
                res.end('Error processing new file');
                return;
              }

              console.log('File compression successful');
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(`
                <h1>Image Compressed</h1>
                <p><strong>Image Name:</strong> uploaded_image.jpg</p>
                <p><strong>Old Size:</strong> ${(statsOld.size / 1024).toFixed(2)} KB</p>
                <p><strong>New Size:</strong> ${(statsNew.size / 1024).toFixed(2)} KB</p>
                <a href="/compressed/uploaded_image.jpg" download>Download Compressed Image</a>
              `);
            });
          });
        });
      });
    });
  } else {
    console.log('404 Not Found');
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
