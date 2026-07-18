export const LOCAL_MODEL = 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';
let enginePromise;

export function isLocalAIAvailable() {
  return typeof navigator !== 'undefined' && 'gpu' in navigator;
}

export async function loadLocalAI(onProgress = () => {}) {
  if (!isLocalAIAvailable()) throw new Error('WebGPU is not available in this browser.');
  if (!enginePromise) {
    enginePromise = import('@mlc-ai/web-llm').then(({ CreateMLCEngine }) => CreateMLCEngine(LOCAL_MODEL, {
      initProgressCallback: (progress) => onProgress(progress),
    }));
  }
  try {
    return await enginePromise;
  } catch (error) {
    enginePromise = undefined;
    throw error;
  }
}

const SYSTEM_PROMPT = `You are Promise Radar, a careful text interpreter. Analyze the user's text and return ONLY valid JSON.
Find commitments, personal intentions, direct requests, decisions, and useful reminders. Do not invent tasks.
Questions are not promises unless the same text also contains a clear intention. Ignore greetings and opinions.
Return this exact shape: {"items":[{"kind":"promise|intention|request|decision|reminder","title":"short action","tag":"you promised|you intend|they asked|decision pending|reminder","meta":"short time or person context","move":"one practical next step","confidence":0.0,"evidence":["short phrase from input"]}]}
Use confidence from 0.0 to 1.0. Return an empty items array when there is no actionable signal. Keep at most 6 items.`;

function validItem(item, index) {
  if (!item || typeof item.title !== 'string' || !item.title.trim()) return null;
  const confidence = Math.max(0, Math.min(1, Number(item.confidence) || 0));
  if (confidence < 0.45) return null;
  const allowed = new Set(['promise', 'intention', 'request', 'decision', 'reminder']);
  const kind = allowed.has(item.kind) ? item.kind : 'intention';
  const tags = { promise: 'you promised', intention: 'you intend', request: 'they asked', decision: 'decision pending', reminder: 'reminder' };
  return {
    id: `local-${index}-${item.title}`,
    title: item.title.trim().replace(/^./, (char) => char.toUpperCase()),
    confidence: `${Math.round(confidence * 100)}% local signal`,
    tag: tags[kind],
    meta: typeof item.meta === 'string' && item.meta.trim() ? item.meta.trim() : 'Context understood locally',
    move: typeof item.move === 'string' && item.move.trim() ? item.move.trim() : 'Best next move: make it concrete',
    action: kind === 'request' ? 'snooze' : 'draft',
    reasons: ['local language model', ...(Array.isArray(item.evidence) ? item.evidence.slice(0, 2).map((e) => `“${String(e)}”`) : [])],
    source: Array.isArray(item.evidence) ? item.evidence.join(' ') : '',
  };
}

export async function analyzeWithLocalAI(text, onProgress, onStatus = () => {}) {
  const engine = await loadLocalAI(onProgress);
  onStatus('Model ready · generating a short answer');
  const response = await engine.chat.completions.create({
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: text }],
    temperature: 0,
    max_tokens: 220,
    response_format: { type: 'json_object' },
  });
  const raw = response.choices?.[0]?.message?.content || '{"items":[]}';
  onStatus('Answer received · checking results');
  const jsonText = raw.match(/\{[\s\S]*\}/)?.[0] || '{"items":[]}';
  const parsed = JSON.parse(jsonText);
  onStatus('Results validated');
  return (Array.isArray(parsed.items) ? parsed.items : []).map(validItem).filter(Boolean).slice(0, 6);
}
