import { fetchCountryDetails } from "../services/api.js";
import { removeFavorite } from "../services/favorites.js";
import { createElement, createImage, createInfoItem } from "../utils/dom.js";
import { updateFavoritesList } from "./favoritesList.js";
import { formatNumber } from "../utils/formatters.js";

let expandedCountries = new Map();

export function createFavoriteItem(countryData) {
  const item = createElement("li", "favorite-item");
  item.setAttribute("id", `favorite-${countryData.name}`);

  const isExpanded = expandedCountries.get(countryData.name);

  const header = createElement("div", "favorite-header");

  const title = createElement("h4", "favorite-country-name");
  title.textContent = countryData.name;

  const flag = createImage(
    countryData.flag,
    `Flag of ${countryData.name}`,
    "favorite-country-flag",
  );

  header.appendChild(flag);
  header.appendChild(title);

  const actions = createElement("div", "favorite-actions");

  const expandBtn = createElement("button", "favorite-expand-btn");
  expandBtn.textContent = isExpanded ? "▲ Collapse" : "▼ Expand";
  expandBtn.type = "button";
  expandBtn.addEventListener("click", () => toggleExpand(countryData, item));

  const removeBtn = createElement("button", "favorite-remove-btn");
  removeBtn.textContent = "Remove";
  removeBtn.type = "button";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeFavorite(countryData.name);
    expandedCountries.delete(countryData.id);
    const favoriteBtn = document.getElementById(
      `favorite-btn-${countryData.name}`,
    );
    if (favoriteBtn) {
      favoriteBtn.textContent = "☆";
    }
    updateFavoritesList();
  });

  actions.appendChild(expandBtn);
  actions.appendChild(removeBtn);

  header.appendChild(actions);
  item.appendChild(header);

  if (isExpanded) {
    const details = expandedCountries.get(countryData.id);
    if (details) {
      const detailsElement = createExpandedDetails(details);
      item.appendChild(detailsElement);
      item.classList.add("expanded");
    }
  }

  return item;
}

async function toggleExpand(favorite, item) {
  const isCurrentlyExpanded = expandedCountries.has(favorite.id);

  if (isCurrentlyExpanded) {
    // Collapse
    expandedCountries.delete(favorite.id);
    const detailsElement = item.querySelector(".favorite-details");
    if (detailsElement) {
      detailsElement.remove();
    }
    item.classList.remove("expanded");

    // Update button text
    const expandBtn = item.querySelector(".favorite-expand-btn");
    if (expandBtn) expandBtn.textContent = "▼ Expand";
  } else {
    // Expand - fetch full details
    const expandBtn = item.querySelector(".favorite-expand-btn");
    if (expandBtn) {
      expandBtn.textContent = "⏳ Loading...";
      expandBtn.disabled = true;
    }

    try {
      const fullData = await fetchCountryDetails(favorite.name);

      if (fullData) {
        expandedCountries.set(favorite.id, fullData);

        // Remove loading state
        if (expandBtn) {
          expandBtn.textContent = "▲ Collapse";
          expandBtn.disabled = false;
        }

        // Add details
        const detailsElement = createExpandedDetails(fullData);
        item.appendChild(detailsElement);
        item.classList.add("expanded");
      } else {
        throw new Error("Country not found");
      }
    } catch (error) {
      console.error("Error fetching country details:", error);

      if (expandBtn) {
        expandBtn.textContent = "▼ Expand";
        expandBtn.disabled = false;
      }

      // Show error
      const errorMsg = createElement("div", "favorite-error");
      errorMsg.textContent = "Failed to load details. Please try again.";
      item.appendChild(errorMsg);

      setTimeout(() => errorMsg.remove(), 3000);
    }
  }
}

function createExpandedDetails(countryData) {
  const details = createElement("div", "favorite-details");
  const grid = createElement("div", "favorite-details-grid");

  // Capital
  const capitalDiv = createInfoItem(
    "favorite-detail-item",
    "Capital",
    "favorite-detail-label",
    Array.isArray(countryData.capital) ? countryData.capital[0] : "N/A",
    "favorite-detail-value",
  );

  // Population
  const populationDiv = createInfoItem(
    "favorite-detail-item",
    "Population",
    "favorite-detail-label",
    formatNumber(countryData.population),
    "favorite-detail-value",
  );

  // Region
  const regionDiv = createInfoItem(
    "favorite-detail-item",
    "Region",
    "favorite-detail-label",
    countryData.region || "N/A",
    "favorite-detail-value",
  );

  // Area
  const areaDiv = createInfoItem(
    "favorite-detail-item",
    "Area",
    "favorite-detail-label",
    countryData.area ? `${formatNumber(countryData.area)} km²` : "N/A",
    "favorite-detail-value",
  );

  // Currencies
  const currencies = countryData.currencies
    ? Object.values(countryData.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";
  const currencyDiv = createInfoItem(
    "favorite-detail-item",
    "Currency",
    "favorite-detail-label",
    currencies,
    "favorite-detail-value",
  );

  // Timezones
  const timezones = countryData.timezones
    ? countryData.timezones.join(", ")
    : "N/A";
  const timezoneDiv = createInfoItem(
    "favorite-detail-item",
    "Timezones",
    "favorite-detail-label",
    timezones,
    "favorite-detail-value",
  );

  // Borders
  const borders = countryData.borders ? countryData.borders.join(", ") : "None";
  const bordersDiv = createInfoItem(
    "favorite-detail-item",
    "Borders",
    "favorite-detail-label",
    borders,
    "favorite-detail-value",
  );

  // Languages
  const languages = countryData.languages
    ? Object.values(countryData.languages).join(", ")
    : "N/A";
  const languagesDiv = createInfoItem(
    "favorite-detail-item",
    "Languages",
    "favorite-detail-label",
    languages,
    "favorite-detail-value",
  );

  grid.appendChild(capitalDiv);
  grid.appendChild(populationDiv);
  grid.appendChild(regionDiv);
  grid.appendChild(areaDiv);
  grid.appendChild(currencyDiv);
  grid.appendChild(timezoneDiv);
  grid.appendChild(bordersDiv);
  grid.appendChild(languagesDiv);

  details.appendChild(grid);

  // Map link
  if (countryData.maps?.googleMaps) {
    const mapLink = createElement("a", "country-map-link");
    mapLink.href = countryData.maps.googleMaps;
    mapLink.textContent = "🗺️ View on Google Maps";
    mapLink.target = "_blank";
    mapLink.rel = "noopener noreferrer";
    details.appendChild(mapLink);
  }

  return details;
}
