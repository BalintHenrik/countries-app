import {
  createElement,
  createImage,
  createLink,
  createInfoItem,
} from "../utils/dom.js";
import { formatNumber } from "../utils/formatters.js";

export function createCountryCard(countryData) {
  const card = createElement("div", "country-card fade-in");

  const flagImg = createImage(
    countryData.flags.png,
    `Flag of ${countryData.name.common}`,
    "country-flag"
  );

  const content = createElement("div", "country-content");

  const title = createElement("h2", "country-name");
  title.textContent = countryData.name.common;

  const info = createElement("div", "country-info");

  const capitalItem = createInfoItem(
    "country-info-item",
    "Capital",
    "country-info-label",
    countryData.capital || "N/A",
    "country-info-value"
  );
  const populationItem = createInfoItem(
    "country-info-item",
    "Population",
    "country-info-label",
    formatNumber(countryData.population),
    "country-info-value"
  );

  const currencyKey = Object.keys(countryData.currencies || {})[0];
  const currency = countryData.currencies?.[currencyKey];
  const currencyItem = createInfoItem(
    "country-info-item",
    "Currency",
    "country-info-label",
    currency ? `${currency.name} (${currency.symbol})` : "N/A",
    "country-info-value"
  );

  const mapLink = createLink(
    countryData.maps.googleMaps,
    "View on Google Maps",
    "country-map-link",
    true
  );

  info.appendChild(capitalItem);
  info.appendChild(populationItem);

  content.appendChild(title);
  content.appendChild(currencyItem);
  content.appendChild(info);
  content.appendChild(mapLink);

  card.appendChild(flagImg);
  card.appendChild(content);

  return card;
}
