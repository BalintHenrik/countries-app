const HISTORY_KEY = "country_search_history";
const MAX_ITEMS = 10;

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (error) {
    console.error("Failed to load history from localStorage", error);
    return [];
  }
}

export function addToHistory(term) {
  if (!term || typeof term !== "string") {
    return;
  }

  const trimmedTerm = term.trim();
  if (!trimmedTerm) {
    return;
  }

  let history = loadHistory();
  history = history.filter(
    (item) => item.toLowerCase() !== trimmedTerm.toLowerCase()
  );
  history.unshift(trimmedTerm);

  if (history.length > MAX_ITEMS) {
    history = history.slice(0, MAX_ITEMS);
  }

  saveHistory(history);
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history from localStorage", error);
  }
}
