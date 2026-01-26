import {
  addFavorite,
  isFavorited,
  removeFavorite,
} from "../services/favorites.js";
import {
  createElement,
  createImage,
  createLink,
  createInfoItem,
} from "../utils/dom.js";
import { formatNumber } from "../utils/formatters.js";
import { updateFavoritesList } from "./favoritesList.js";

export function createCountryCard(countryData) {
  const card = createElement("article", "country-card fade-in");
  card.ariaLabel = `Country card for ${countryData.name.common}`;

  const flagImg = createImage(
    countryData.flags.png,
    `Flag of ${countryData.name.common}`,
    "country-flag",
  );

  const content = createElement("div", "country-content");

  const title = createElement("h2", "country-name");
  title.textContent = countryData.name.common;

  const info = createElement("div", "country-info");
  const header = createElement("div", "country-header");

  const capitalItem = createInfoItem(
    "country-info-item",
    "Capital",
    "country-info-label",
    countryData.capital || "N/A",
    "country-info-value",
  );
  const populationItem = createInfoItem(
    "country-info-item",
    "Population",
    "country-info-label",
    formatNumber(countryData.population),
    "country-info-value",
  );

  const currencyKey = Object.keys(countryData.currencies || {})[0];
  const currency = countryData.currencies?.[currencyKey];
  const currencyItem = createInfoItem(
    "country-info-item",
    "Currency",
    "country-info-label",
    currency ? `${currency.name} (${currency.symbol})` : "N/A",
    "country-info-value",
  );

  const mapLink = createLink(
    countryData.maps.googleMaps,
    "🗺️ View on Google Maps",
    "country-map-link",
    true,
  );
  mapLink.ariaLabel = `View ${countryData.name.common} on Google Maps`;

  const favoriteBtn = createElement("button", "favorite-btn");
  favoriteBtn.textContent = isFavorited(countryData.name.common) ? "★" : "☆";
  favoriteBtn.addEventListener("click", () => {
    if (isFavorited(countryData.name.common)) {
      removeFavorite(countryData.name.common);
    } else {
      addFavorite(countryData);
    }
    favoriteBtn.textContent = isFavorited(countryData.name.common) ? "★" : "☆";
    updateFavoritesList();
  });
  favoriteBtn.id = `favorite-btn-${countryData.name.common}`;
  favoriteBtn.ariaLabel = "Toggle favorite for " + countryData.name.common;

  info.appendChild(capitalItem);
  info.appendChild(populationItem);
  info.appendChild(currencyItem);

  header.appendChild(title);
  header.appendChild(favoriteBtn);

  content.appendChild(header);
  content.appendChild(info);
  content.appendChild(mapLink);

  card.appendChild(flagImg);
  card.appendChild(content);

  return card;
}
