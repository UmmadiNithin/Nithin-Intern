const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === '/') {
        // Serve the index.html file4
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (path === '/style.css') {
        // Serve the style.css file
        fs.readFile('style.css', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/css'});
                res.end('Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
            }
        });
    } else if (path === '/script.js') {
        // Serve the script.js file
        fs.readFile('script.js', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/javascript'});
                res.end('Server Error');
            } else {
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.end(data);
            }
        });
    } else if (path.startsWith('/api/records')) {
        const id = parsedUrl.query.id;
        const filePath = 'data.json';

        if (method === 'GET') {
            // Read data.json and send it as JSON
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ error: 'Could not read file' }));
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(data);
                }
            });
        } else if (method === 'POST' || method === 'PUT') {
            // Handle adding/updating records
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const newRecord = JSON.parse(body);

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ error: 'Could not read file' }));
                    } else {
                        let records = JSON.parse(data);

                        if (method === 'POST') {
                            newRecord.id = records.length ? records[records.length - 1].id + 1 : 1;
                            records.push(newRecord);
                        } else if (method === 'PUT') {
                            records = records.map(record => record.id === newRecord.id ? newRecord : record);
                        }

                        fs.writeFile(filePath, JSON.stringify(records), err => {
                            if (err) {
                                res.writeHead(500, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify({ error: 'Could not write file' }));
                            } else {
                                res.writeHead(200, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify(newRecord));
                            }
                        });
                    }
                });
            });
        } else if (method === 'DELETE') {
            // Handle deleting a record
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ error: 'Could not read file' }));
                } else {
                    const records = JSON.parse(data);
                    const remainingRecords = records.filter(record => record.id !== parseInt(id));

                    fs.writeFile(filePath, JSON.stringify(remainingRecords), err => {
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ error: 'Could not write file' }));
                        } else {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ success: true }));
                        }
                    });
                }
            });
        }
    } else {
        // Handle 404 Not Found
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
