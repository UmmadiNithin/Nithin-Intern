const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            switch (pathname) {
                case '/create':
                    createFile(data.fileName, res);
                    break;
                case '/delete':
                    deleteFile(data.fileName, res);
                    break;
                case '/load':
                    loadFile(data.fileName, res);
                    break;
                case '/append':
                    appendToFile(data.fileName, data.content, res);
                    break;
                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not Found');
                    break;
            }
        });

    } else if (req.method === 'GET' && pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

function createFile(fileName, res) {
    fs.writeFile(path.join(__dirname, fileName), '', err => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error creating file' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'File created successfully' }));
        }
    });
}

function deleteFile(fileName, res) {
    fs.unlink(path.join(__dirname, fileName), err => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error deleting file' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'File deleted successfully' }));
        }
    });
}

function loadFile(fileName, res) {
    fs.readFile(path.join(__dirname, fileName), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ content: '' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ content: data }));
        }
    });
}

function appendToFile(fileName, content, res) {
    fs.appendFile(path.join(__dirname, fileName), content + '\n', err => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error appending to file' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Content appended successfully' }));
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
