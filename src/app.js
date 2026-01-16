import { fetchCountry } from "./api.js";
import {
  renderHistory,
  createCountryCard,
  createErrorDiv,
  clearPreviousResults,
  setLoadingState,
} from "./ui.js";
import { updateHistory } from "./data.js";

export async function handleSearch(event) {
  event.preventDefault();
  clearPreviousResults();
  setLoadingState(true);

  const resultDiv = document.getElementById("result");
  const input = document.getElementById("country-search");

  const countryName = input.value.toLowerCase().trim();
  const data = await fetchCountry(countryName);

  setLoadingState(false);

  if (data) {
    console.log("Country data:", data);
    data.forEach((country) => {
      updateHistory(country.name.common);
      const countryDiv = createCountryCard(country);
      resultDiv.appendChild(countryDiv);
    });
  } else {
    const errorDiv = createErrorDiv();
    resultDiv.appendChild(errorDiv);
  }
  input.value = "";
  renderHistory(handleSearch);
}

export function app() {
  const form = document.getElementById("search-form");

  renderHistory(handleSearch);

  form.addEventListener("submit", async (event) => {
    await handleSearch(event);
  });
}
