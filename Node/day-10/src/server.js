const express = require('express');
const path = require('path');
const app = express();

app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, '../public/downloads/deleted_student.json');
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err.message);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
  console.log('Download deleted_student.json file from http://localhost:3000/download');
});
