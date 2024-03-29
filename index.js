const express = require('express');
const https = require('https');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const app = express();
const path = require('path');

const server = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/madgs.ru/privkey.pem"), 
    cert: fs.readFileSync("/etc/letsencrypt/live/madgs.ru/cert.pem"),
}, app);

app.use('/api', createProxyMiddleware({ 
  target: 'https://api.madgs.ru',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

// Добавьте обработку статических файлов React
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'manifest.json'));
});

server.listen(3003, () => {
  console.log('Сервер запущен на порту 3003');
});