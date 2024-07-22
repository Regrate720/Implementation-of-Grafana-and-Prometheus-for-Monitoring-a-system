const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Configuración de métricas de Prometheus
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Contador de ejemplo
const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'Total number of processed requests',
});

app.get('/', (req, res) => {
  counter.inc(); // Incrementar el contador
  res.send('Hello World!');
});

// Ruta para las métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
