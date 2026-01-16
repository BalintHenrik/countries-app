import { loadHistory } from "./data.js";
import { handleSearch } from "./app.js";

export async function renderHistory(onHistoryItemClick) {
  const history = loadHistory();
  const historyDiv = document.getElementById("history");
  while (historyDiv.firstChild) {
    historyDiv.removeChild(historyDiv.firstChild);
  }

  if (history.length === 0) {
    return;
  }

  const title = document.createElement("h3");
  title.innerText = "Recent Searches";
  historyDiv.appendChild(title);

  const list = document.createElement("ul");
  list.className = "history-list";

  history.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "history-item";
    listItem.innerText = item;
    listItem.style.cursor = "pointer";

    listItem.addEventListener("click", (event) => {
      const input = document.getElementById("country-search");
      input.value = item;
      onHistoryItemClick(event);
    });

    list.appendChild(listItem);
  });

  historyDiv.appendChild(list);
}

export function createCountryCard(countryData) {
  const countryDiv = document.createElement("div");
  countryDiv.className = "country-card";

  const name = document.createElement("h2");
  name.innerText = countryData.name.common;

  const capital = document.createElement("p");
  capital.innerText = `Capital: ${countryData.capital}`;

  const population = document.createElement("p");
  const fmt = new Intl.NumberFormat(navigator.language, {
    maximumFractionDigits: 0,
  });
  const populationText = fmt.format(countryData.population);
  population.innerText = `Population: ${populationText}`;

  const currency = document.createElement("p");
  const currencyKey = Object.keys(countryData.currencies)[0];
  currency.innerText = `Currency: ${countryData.currencies[currencyKey].name} (${countryData.currencies[currencyKey].symbol})`;

  const flag = document.createElement("img");
  flag.className = "flag-img";
  flag.src = countryData.flags.png;
  flag.alt = `Flag of ${countryData.name.common}`;
  flag.width = 140;
  flag.height = 100;

  const mapLink = document.createElement("a");
  mapLink.href = countryData.maps.googleMaps;
  mapLink.innerText = "Google Maps";
  mapLink.target = "_blank";

  countryDiv.appendChild(flag);
  countryDiv.appendChild(name);
  countryDiv.appendChild(capital);
  countryDiv.appendChild(population);
  countryDiv.appendChild(currency);
  countryDiv.appendChild(mapLink);

  return countryDiv;
}

export function createErrorDiv() {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerText = "Country not found. Please try again.";

  return errorDiv;
}

export function clearPreviousResults() {
  const previousResults = document.querySelectorAll(".country-card");
  previousResults.forEach((result) => result.remove());

  const errorMessages = document.querySelectorAll(".error-message");
  if (errorMessages) {
    errorMessages.forEach((message) => message.remove());
  }
}

export function setLoadingState(state) {
  const spinner = document.getElementById("loading-spinner");
  const searchButton = document.getElementById("search-btn");
  if (state) {
    spinner.style.display = "block";
    searchButton.disabled = true;
  } else {
    spinner.style.display = "none";
    searchButton.disabled = false;
  }
}
