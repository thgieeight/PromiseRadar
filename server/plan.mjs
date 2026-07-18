export function buildPlan(signals = []) {
  return signals.slice(0, 8).map((signal, index) => {
    const title = signal.title || 'Untitled open loop';
    const step = signal.tag === 'decision pending'
      ? 'Choose one criterion and set a decision time.'
      : signal.tag === 'reminder'
        ? 'Put a visible reminder on the calendar.'
        : 'Take the smallest visible step and record the outcome.';
    return { order: index + 1, title, why: signal.meta || 'Open loop detected', nextStep: step, requiresApproval: true };
  });
}
