import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';
import { detectPromises } from '../src/promiseEngine.js';
import { buildPlan } from './plan.mjs';

const server = new McpServer({ name: 'promise-radar', version: '0.1.0' }, { instructions: 'Promise Radar surfaces human open loops. Never take an external side effect without explicit user approval.' });

server.registerTool('analyze_text', { description: 'Analyze text for promises, intentions, requests, decisions, reminders, and missed routines.', inputSchema: { text: z.string().min(1) }, outputSchema: { signals: z.array(z.any()), engine: z.string() } }, async ({ text }) => { const signals = detectPromises(text); return { content: [{ type: 'text', text: JSON.stringify({ signals, plan: buildPlan(signals) }) }], structuredContent: { signals, engine: 'fast-explainable-logic' } }; });
server.registerTool('plan_open_loops', { description: 'Turn analyzed Promise Radar signals into approval-required next steps. This tool does not send, post, or modify anything.', inputSchema: { signals: z.array(z.any()) }, outputSchema: { plan: z.array(z.any()) } }, async ({ signals }) => { const plan = buildPlan(signals); return { content: [{ type: 'text', text: JSON.stringify({ plan }) }], structuredContent: { plan } }; });
server.registerTool('connection_status', { description: 'List available source adapters and whether they are configured. No account access is attempted.', inputSchema: {}, outputSchema: { sources: z.array(z.any()) } }, async () => { const sources = [{ name: 'local-files', status: 'ready' }, { name: 'gmail', status: 'oauth-required' }, { name: 'whatsapp-business', status: 'oauth-required' }, { name: 'messenger', status: 'oauth-required' }, { name: 'x', status: 'oauth-required' }, { name: 'slack', status: 'oauth-required' }]; return { content: [{ type: 'text', text: JSON.stringify({ sources }) }], structuredContent: { sources } }; });

await server.connect(new StdioServerTransport());
