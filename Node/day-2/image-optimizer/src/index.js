import http from 'http';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import chalk from 'chalk';

const __dirname = path.resolve();

// Ensure 'uploads' and 'compressed' directories exist
const uploadDir = path.join(__dirname, 'uploads');
const compressedDir = path.join(__dirname, 'compressed');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
if (!fs.existsSync(compressedDir)) {
  fs.mkdirSync(compressedDir);
}

// Multer setup for file uploads
const upload = multer({ dest: uploadDir });

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      console.log(chalk.blue('Serving index.html'));
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
        if (err) {
          console.error(chalk.red('Error loading index.html:'), err);
          res.writeHead(500);
          res.end('Error loading index.html');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (req.url.startsWith('/compressed/')) {
      console.log(chalk.green(`Serving compressed image: ${req.url}`));
      fs.readFile(path.join(__dirname, req.url), (err, data) => {
        if (err) {
          console.error(chalk.red('Error serving compressed image:'), err);
          res.writeHead(404);
          res.end('File not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      });
    } else {
      console.log(chalk.yellow('404 Not Found'));
      res.writeHead(404);
      res.end('Not found');
    }
  } else if (req.method === 'POST' && req.url === '/upload') {
    console.log(chalk.blue('Handling file upload'));

    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error(chalk.red('Error uploading file:'), err);
        res.writeHead(500);
        res.end('Error uploading file');
        return;
      }

      const uploadPath = req.file.path;
      const compressedImagePath = path.join(compressedDir, req.file.filename + '.jpg');

      console.log(chalk.blue('Starting image compression'));
      sharp(uploadPath)
        .resize({ width: 800 })  // Resize image to 800px wide
        .toFile(compressedImagePath)
        .then(info => {
          console.log(chalk.green('Image compression successful'));
          console.log(chalk.blue('Checking file sizes'));
          fs.stat(uploadPath, (err, statsOld) => {
            if (err) {
              console.error(chalk.red('Error getting old file stats:'), err);
              res.writeHead(500);
              res.end('Error processing old file');
              return;
            }

            fs.stat(compressedImagePath, (err, statsNew) => {
              if (err) {
                console.error(chalk.red('Error getting new file stats:'), err);
                res.writeHead(500);
                res.end('Error processing new file');
                return;
              }

              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(`
                <h1>Image Compressed</h1>
                <p><strong>Image Name:</strong> ${req.file.originalname}</p>
                <p><strong>Old Size:</strong> ${(statsOld.size / 1024).toFixed(2)} KB</p>
                <p><strong>New Size:</strong> ${(statsNew.size / 1024).toFixed(2)} KB</p>
                <a href="/compressed/${req.file.filename}.jpg" download>Download Compressed Image</a>
              `);
            });
          });
        })
        .catch(err => {
          console.error(chalk.red('Error compressing image:'), err);
          res.writeHead(500);
          res.end('Error compressing image');
        });
    });
  } else {
    console.log(chalk.yellow('404 Not Found'));
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(chalk.green(`Server running at http://localhost:${PORT}`));
});
