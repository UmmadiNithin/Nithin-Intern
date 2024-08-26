const { Client } = require('pg');

const client = new Client({
  host: "localhost",
  user: "postgres",     
  port: 5432,
  password: "JVNPP143", 
  database: "postgres" 
});

client.connect();

module.exports = client;
