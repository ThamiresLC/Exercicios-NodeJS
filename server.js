const http = require('http');
const url = require('url');

const hostname = '127.0.0.1'; // ou 'localhost'
const port = 3001; // 8080

const server = http.createServer((requisicao, resposta) => { 
  const urlAnalise = url.parse(requisicao.url, true);
  const parametrosConsulta = urlAnalise.query;

  console.log(requisicao.url);
  if (requisicao.url.startsWith('/bye')) {
    resposta.statusCode = 200;
    resposta.setHeader('Content-Type', 'text/plain');
    resposta.end(`Tchau`); 
    return;
  } else if (requisicao.url.startsWith('/hello')) {
    resposta.statusCode = 200;
    resposta.setHeader('Content-Type', 'text/plain');
    resposta.end(`Hello ${parametrosConsulta.nome} ${parametrosConsulta.sobrenome}`);
    return;
  }

  // Original
  // resposta.statusCode = 200;
  // resposta.setHeader('Content-Type', 'text/plain');
  // resposta.end(`Hello ${parametrosConsulta.nome} ${parametrosConsulta.sobrenome}`);
  
  // Caso não entre nas condições das linhas 12 e 17.
  resposta.statusCode = 404;
  resposta.setHeader('Content-Type', 'text/plain');
  resposta.end(`Pagina nao encontrada ${requisicao.url}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// http://127.0.0.1:3000/hello?nome=Vinicius&sobrenome=Costa
// http://localhost:3000/hello?nome=Vinicius
// https://g1.globo.com/mundo/ao-vivo/guerra-ucrania-russia-putin-invasao.ghtml?postId=1f4590a3-14b9-4466-9919-0aa8ac4821a1

// URL
// protocolo: http | https
// hostname: 127.0.0.1 | localhost | g1.globo.com
// porta: 3000 | 80 (padrao http) | 443 (padrao https) | 1 - 65535
// path ou rota: /hello | /bye | /mundo/ao-vivo/....
// search: ?chave=valor
