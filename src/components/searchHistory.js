import {
  loadHistory as getHistory,
  clearHistory as clearStorageHistory,
  addToHistory as saveToHistory,
} from "../services/storage.js";
import { createElement, clearElementChildren } from "../utils/dom.js";

export function createSearchHistory(onItemClick) {
  const history = getHistory();

  if (history.length === 0) {
    return null;
  }

  const section = createElement("section", "history-section");
  const container = createElement("div", "history-container");

  // Create header
  const header = createElement("div", "history-header");

  const title = createElement("h3", "history-title");
  title.textContent = "Recent Searches";

  const clearBtn = createElement("button", "history-clear-btn");
  clearBtn.id = "clear-history";
  clearBtn.textContent = "Clear History";
  clearBtn.addEventListener("click", () => {
    clearStorageHistory();
    updateSearchHistory(onItemClick);
  });

  header.appendChild(title);
  header.appendChild(clearBtn);

  // Create list
  const list = createElement("ul", "history-list");

  history.forEach((item) => {
    const li = createElement("li", "history-item");
    const btn = createElement("button", "history-item-btn");
    btn.type = "button";
    btn.textContent = item;
    btn.addEventListener("click", () => onItemClick(item));
    li.appendChild(btn);
    list.appendChild(li);
  });

  container.appendChild(header);
  container.appendChild(list);
  section.appendChild(container);

  return section;
}

export function updateSearchHistory(onItemClick) {
  const section = document.getElementById("history-section");
  if (section) {
    clearElementChildren(section);
    const newHistory = createSearchHistory(onItemClick);
    if (newHistory) {
      section.appendChild(newHistory);
    }
  }
}

export function addToHistory(term, onItemClick) {
  saveToHistory(term);
  updateSearchHistory(onItemClick);
}
