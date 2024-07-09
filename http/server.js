import http from 'http';
import fs from 'fs';

const PORT = 80;

function main() {
  const resources = fs.readdirSync('./resources');
  
  const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = fs.readFileSync('./index.html', 'utf-8');
        res.writeHead(200).end(data);
      } else if (resources.findIndex(x => x === req.url.slice(1)) !== -1) {
        const data = fs.readFileSync('./resources' + req.url);
        res.writeHead(200).end(data);
      } else {
        res.writeHead(404).end();
      }
    } else {
      res.writeHead(405).end();
    }
  });

  server.listen(PORT, () => console.log('HTTP listening on port 80!'));
}

main();