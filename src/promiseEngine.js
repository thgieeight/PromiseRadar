// Fast, offline semantic heuristics. It is intentionally explainable, but
// uses phrase families, clause splitting, and negative-context checks instead
// of relying on one exact sentence template.
const ACTION_WORDS = ['follow up', 'look into', 'pick up', 'get back to', 'send', 'sent', 'share', 'shared', 'write', 'wrote', 'draft', 'finish', 'finished', 'review', 'reviewed', 'update', 'updated', 'build', 'built', 'make', 'made', 'create', 'created', 'prepare', 'prepared', 'book', 'booked', 'schedule', 'scheduled', 'call', 'called', 'email', 'emailed', 'message', 'messaged', 'intro', 'introduce', 'introduced', 'connect', 'connected', 'check', 'checked', 'fix', 'fixed', 'ship', 'shipped', 'deliver', 'delivered', 'return', 'returned', 'pay', 'paid', 'buy', 'bought', 'purchase', 'purchased', 'submit', 'submitted', 'bring', 'brought', 'remind', 'help', 'helped', 'upload', 'uploaded', 'publish', 'published', 'post', 'posted', 'release', 'released', 'record', 'recorded', 'compose', 'composed', 'edit', 'edited', 'apply', 'applied', 'learn', 'learned', 'practice', 'practiced', 'start', 'started', 'cancel', 'cancelled', 'renew', 'renewed', 'clean', 'cleaned', 'organize', 'organized', 'plan', 'planned', 'decide', 'decided'];
const ACTIONS = new RegExp(`\\b(${ACTION_WORDS.join('|')})\\b`, 'i');
const COMMITMENTS = [/\b(?:i|we)\s*(?:will|'ll|can|promise to|agree to)\b/i, /\b(?:i'm|we're)\s+going to\b/i, /\b(?:i|we)\s+(?:plan to|plan on|intend to|am going to)\b/i, /\b(?:let me|i'll make sure|i can make sure)\b/i];
const INTENTS = [/\b(?:i|we)\s+(?:really\s+)?(?:need to|should|ought to|have to|want to|must)\b/i, /\b(?:i|we)\s+(?:think|feel)\s+(?:i|we)\s+(?:need to|should|have to|will|'ll)\b/i, /\b(?:i|we)\s+(?:have been meaning|keep meaning)\s+to\b/i, /\btime to\b/i];
const REQUESTS = [/\b(?:can|could|would)\s+(?:you|someone|anyone)\b/i, /\bwould you be able to\b/i, /\bplease\b/i, /\bdo you mind\b/i, /\bcan someone\b/i];
const DECISIONS = [/\b(?:what do you think|do you think)\b/i, /\bshould (?:i|we)\b/i, /\bis it worth\b/i, /\bwould it be better\b/i, /\bwhich should\b/i];
const REMINDERS = [/\bremind me to\b/i, /\bdon't let me forget\b/i, /\bmake a note to\b/i, /\bremember to\b/i];
const MISSED_ROUTINE = /\b(?:i|we)\s+(?:haven't|have not|didn't|did not)\b.*\b(?:in|for)\s+\d+\s+(?:day|days|week|weeks|month|months|year|years)\b/i;
const DEADLINE = /\b(?:today|tonight|tomorrow|this\s+week|next\s+week|this\s+month|next\s+month|monday|tuesday|wednesday|thursday|friday|saturday|sunday|(?:by|before|on)\s+(?:today|tonight|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|the\s+end\s+of\s+(?:this|next)\s+\w+))\b/i;
const DURATION = /\b\d+\s+(?:day|days|week|weeks|month|months|year|years)\b/i;
const HEDGES = /\b(?:maybe|might|possibly|if you want|no rush|sometime|when you get a chance|probably|hopefully)\b/i;
const NEGATION = /\b(?:not|never|haven't|hasn't|didn't|don't)\b/i;
const POLITE_ONLY = /^(?:thanks|thank you|great|awesome|love(?:d)? it|sounds good|nice|perfect|lol|haha)\b/i;
const NON_NAMES = new Set(['Also', 'Today', 'Tomorrow', 'Please', 'Maybe', 'When', 'Could', 'Would', 'Can', 'Then']);

const normalize = (value) => String(value || '').replace(/[’‘`]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const splitText = (text) => normalize(text).replace(/\r/g, '').split(/(?<=[.!?])\s+|\n+/).flatMap((sentence) => sentence.split(/\s+(?=(?:and|but|also|then)\s+(?:i|we|you|can|could|should|maybe)\b)/i)).map((value) => value.trim()).filter(Boolean);
const matchAny = (patterns, text) => patterns.some((pattern) => pattern.test(text));

function getTime(sentence) {
  const date = sentence.match(DEADLINE); if (date) return { label: date[0].replace(/^by\s+/i, 'By ').replace(/^before\s+/i, 'Before '), weight: 0.16 };
  const duration = sentence.match(DURATION); if (duration) return { label: `after ${duration[0]}`, weight: 0.04 };
  return { label: 'No date detected', weight: 0 };
}

function getPerson(sentence) {
  const leading = sentence.match(/^([A-Z][a-z]{1,18})(?:\s*[—–-]|,|:)/);
  return leading && !NON_NAMES.has(leading[1]) ? leading[1] : null;
}

function extractAction(sentence, kind) {
  const lead = kind === 'request' ? /(?:can|could|would)\s+(?:you|someone|anyone)(?:\s+be able to)?\s+(.+?)(?=\s+(?:by|before|on|next|tomorrow|sometime)\b|[.!?]|$)/i
    : kind === 'decision' ? /(?:should (?:i|we)|do you think (?:i|we) should|what do you think of)\s+(.+?)(?=[.!?]|$)/i
      : /(?:i|we)\s+(?:will|'ll|can|promise to|need to|should|ought to|have to|want to|must|plan to|plan on|intend to|am going to|are going to|have been meaning to|keep meaning to|think i should|think i need to)\s+(.+?)(?=\s+(?:by|before|on|next|tomorrow|so|because|when|and i|but i|i have not|i haven't)\b|[.!?]|$)/i;
  const found = sentence.match(lead);
  if (found) return found[1].replace(/^(to|that)\s+/i, '').trim();
  const action = sentence.match(ACTIONS);
  return action ? sentence.slice(action.index).replace(/[.!?]+$/, '').trim() : sentence;
}

function tidyTitle(value) {
  return value.replace(/\s+(please|thanks)\s*$/i, '').replace(/\s+/g, ' ').replace(/\b(?:i|we)\s+(?:have|haven't|have not)\b.*$/i, '').trim().replace(/^./, (char) => char.toUpperCase());
}

function analyzeClause(sentence, index) {
  if (POLITE_ONLY.test(sentence) && !ACTIONS.test(sentence)) return null;
  const hasAction = ACTIONS.test(sentence); const isCommitment = matchAny(COMMITMENTS, sentence); const isIntent = matchAny(INTENTS, sentence); const isRequest = matchAny(REQUESTS, sentence); const isDecision = matchAny(DECISIONS, sentence); const isReminder = matchAny(REMINDERS, sentence); const isMissed = MISSED_ROUTINE.test(sentence);
  if (!hasAction || (!isCommitment && !isIntent && !isRequest && !isDecision && !isReminder && !isMissed)) return null;
  const time = getTime(sentence); const person = getPerson(sentence); const hedged = HEDGES.test(sentence); const negative = NEGATION.test(sentence); const reasons = ['action verb'];
  let score = 0.33;
  score += 0.2;
  if (isCommitment) { score += 0.27; reasons.push('future commitment'); }
  if (isIntent) { score += 0.23; reasons.push('personal intention'); }
  if (isRequest) { score += 0.22; reasons.push('direct request'); }
  if (isDecision) { score += 0.18; reasons.push('decision question'); }
  if (isReminder) { score += 0.2; reasons.push('reminder phrase'); }
  if (isMissed) { score += 0.12; reasons.push('long gap detected'); }
  if (time.weight) { score += time.weight; reasons.push('time signal'); }
  if (person) { score += 0.04; reasons.push('named person'); }
  if (hedged) { score -= 0.08; reasons.push('softened language'); }
  if (negative && !isMissed) score -= 0.12;
  if (score < 0.5) return null;
  const kind = isDecision && !isCommitment && !isIntent ? 'decision pending' : isReminder || isMissed ? 'reminder' : isCommitment ? 'you promised' : isRequest ? 'they asked' : 'you intend';
  const extractionKind = isDecision && !isCommitment && !isIntent ? 'decision' : isRequest && !isCommitment && !isIntent ? 'request' : 'commitment';
  return { id: `${index}-${sentence}`, title: tidyTitle(extractAction(sentence, extractionKind)), confidence: `${Math.round(Math.min(score, 0.99) * 100)}% signal`, tag: kind, meta: `${time.label}${person ? ` · ${person} is involved` : ''}`, move: isDecision ? 'Best next move: choose a criterion or deadline' : isMissed ? 'Best next move: restart with one small version' : isReminder ? 'Best next move: put it somewhere you will see it' : isCommitment || isIntent ? 'Best next move: make the smallest visible step' : 'Best next move: answer or schedule it', action: isDecision || isCommitment || isIntent ? 'draft' : 'snooze', reasons, source: sentence };
}

export function detectPromises(text) {
  const unique = []; for (const [index, clause] of splitText(text).entries()) { const item = analyzeClause(clause, index); if (!item) continue; const duplicate = unique.some((other) => other.title.toLowerCase() === item.title.toLowerCase()); if (!duplicate) unique.push(item); }
  return unique.sort((a, b) => parseInt(b.confidence, 10) - parseInt(a.confidence, 10)).slice(0, 8);
}
