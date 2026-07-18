import http from 'node:http';
import { detectPromises } from '../src/promiseEngine.js';
import { buildPlan } from './plan.mjs';

const PORT = Number(process.env.PROMISE_RADAR_PORT || 8787);

function send(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => { let body = ''; request.on('data', (chunk) => { body += chunk; if (body.length > 1_000_000) reject(new Error('Request too large')); }); request.on('end', () => resolve(JSON.parse(body || '{}'))); request.on('error', reject); });
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  if (request.method === 'GET' && request.url === '/health') return send(response, 200, { ok: true, service: 'promise-radar-api' });
  if (request.method !== 'POST') return send(response, 404, { error: 'Not found' });
  try {
    const body = await readBody(request);
    if (request.url === '/api/analyze' || request.url === '/v1/analyze') {
      const text = String(body.text || '').trim();
      if (!text) return send(response, 400, { error: 'text is required' });
      const signals = detectPromises(text);
      return send(response, 200, { signals, plan: buildPlan(signals), engine: 'fast-explainable-logic' });
    }
    if (request.url === '/api/plan' || request.url === '/v1/plan') return send(response, 200, { plan: buildPlan(Array.isArray(body.signals) ? body.signals : []) });
    return send(response, 404, { error: 'Not found' });
  } catch (error) { return send(response, 400, { error: error.message }); }
});

server.listen(PORT, () => console.log(`Promise Radar API listening on http://localhost:${PORT}`));
