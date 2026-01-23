import { getFavorites, removeAllFavorites } from "../services/favorites.js";
import { clearElementChildren, createElement } from "../utils/dom.js";
import { createFavoriteItem } from "./favoriteItem.js";

export function createFavoritesList() {
  const favorites = getFavorites();

  if (!favorites || favorites.length === 0) {
    return createEmptyState();
  }

  const favoriteSection = createElement("section", "favorites-section");
  const container = createElement("div", "favorites-container");
  const header = createElement("div", "favorites-header");

  const title = createElement("h3", "favorites-title");
  title.textContent = "Favorite Countries";

  const clearBtn = createElement("button", "favorites-clear-btn");
  clearBtn.type = "button";
  clearBtn.textContent = "Clear favorites";
  clearBtn.addEventListener("click", () => {
    const favorites = getFavorites();
    favorites.forEach((fav) => {
      const favoriteBtn = document.getElementById(`favorite-btn-${fav.name}`);
      if (favoriteBtn) {
        favoriteBtn.textContent = "☆";
      }
    });
    removeAllFavorites();
    updateFavoritesList();
  });

  header.appendChild(title);
  header.appendChild(clearBtn);
  container.appendChild(header);

  const list = createElement("ul", "favorites-list");

  favorites.forEach((favorite) => {
    const item = createFavoriteItem(favorite);
    list.appendChild(item);
  });

  container.appendChild(list);
  favoriteSection.appendChild(container);

  return favoriteSection;
}

export function updateFavoritesList() {
  const section = document.getElementById("favorites-section");
  if (section) {
    clearElementChildren(section);
    const newFavorites = createFavoritesList();
    if (newFavorites) {
      section.appendChild(newFavorites);
    }
  }
}

function createEmptyState() {
  const section = createElement("section", "favorites-section");
  const emptyState = createElement("div", "favorites-empty-state");
  const emptyMessage = createElement("p");
  emptyMessage.textContent =
    "No favorites yet. Add your first favorite country!";
  emptyState.appendChild(emptyMessage);
  section.appendChild(emptyState);

  return section;
}
