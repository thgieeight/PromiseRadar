const PROMPT = `You are Promise Radar. Analyze the user's text and return ONLY valid JSON in this shape: {"items":[{"kind":"promise|intention|request|decision|reminder","title":"short action","tag":"you promised|you intend|they asked|decision pending|reminder","meta":"short context","move":"one practical next step","confidence":0.0,"evidence":["exact short phrase"]}]}. Find useful commitments, intentions, requests, decisions, and reminders. Ignore greetings and opinions. Do not invent tasks. Return at most 6 items and use confidence from 0 to 1.`;

const TAGS = { promise: 'you promised', intention: 'you intend', request: 'they asked', decision: 'decision pending', reminder: 'reminder' };

export async function analyzeWithBYOK(text, config, onStatus = () => {}) {
  const response = await fetch(config.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` }, body: JSON.stringify({ model: config.model, temperature: 0, max_tokens: 400, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: PROMPT }, { role: 'user', content: text }] }) });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error?.message || `Provider returned ${response.status}`);
  onStatus('Answer received · checking results');
  const raw = body.choices?.[0]?.message?.content || '{}';
  const json = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] || '{}');
  return (Array.isArray(json.items) ? json.items : []).map((item, index) => {
    const kind = TAGS[item.kind] ? item.kind : 'intention'; const score = Math.max(0, Math.min(1, Number(item.confidence) || 0));
    return { id: `byok-${index}-${item.title}`, title: String(item.title || 'Untitled signal').trim(), confidence: `${Math.round(score * 100)}% provider signal`, tag: TAGS[kind], meta: String(item.meta || 'Context understood by provider'), move: String(item.move || 'Best next move: make it concrete'), action: kind === 'request' ? 'snooze' : 'draft', reasons: ['provider AI', ...(Array.isArray(item.evidence) ? item.evidence.slice(0, 2).map((value) => `“${value}”`) : [])], source: Array.isArray(item.evidence) ? item.evidence.join(' ') : '' };
  }).filter((item) => item.confidence !== '0% provider signal').slice(0, 6);
}
