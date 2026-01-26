const FAVORITE_KEY = "favorite_countries";

export function addFavorite(countryData) {
  if (!countryData || typeof countryData !== "object") {
    return;
  }

  const countryName = countryData.name?.common;
  if (!countryName) {
    return;
  }

  let favorites = getFavorites();
  if (favorites.some((fav) => fav.name === countryName)) {
    return;
  }
  const favoriteItem = {
    name: countryName,
    flag: countryData.flags?.png || "",
  };

  favorites.unshift(favoriteItem);
  saveFavorites(favorites);
}

export function removeFavorite(countryName) {
  if (!countryName || typeof countryName !== "string") {
    return;
  }

  const trimmedName = countryName.trim();
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav.name !== trimmedName);
  saveFavorites(favorites);
}

export function removeAllFavorites() {
  saveFavorites([]);
}

export function isFavorited(countryName) {
  if (!countryName || typeof countryName !== "string") {
    return false;
  }
  try {
    const favorites = getFavorites();
    return favorites.some((fav) => fav.name === countryName);
  } catch (error) {
    console.error("Failed to load favorites from localStorage", error);
    return false;
  }
}

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage", error);
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
}
