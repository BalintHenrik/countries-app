const HISTORY_KEY = "country_search_history";

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveHistory(arr) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
}

export function updateHistory(entry) {
  if (!entry || typeof entry !== "string") {
    return;
  }
  const term = entry.trim();
  if (!term) {
    return;
  }
  let history = loadHistory();
  history = history.filter((item) => item.toLowerCase() !== term.toLowerCase());
  history.unshift(term);
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  saveHistory(history);
}
