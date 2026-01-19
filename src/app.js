import { hideSpinner, showSpinner } from "./components/loadingSpinner.js";
import {
  createSearchForm,
  disableSearchForm,
  enableSearchForm,
} from "./components/searchForm.js";
import { createCountryCard } from "./components/countryCard.js";
import {
  updateSearchHistory,
  addToHistory,
} from "./components/searchHistory.js";
import { createErrorMessage } from "./components/errorMessage.js";
import { fetchCountry } from "./services/api.js";

let isSearching = false;

function clearResults() {
  const resultDiv = document.getElementById("results-section");
  resultDiv.innerHTML = "";
}

function renderCountries(countries) {
  const resultDiv = document.getElementById("results-section");
  countries.forEach((country) => {
    const countryCard = createCountryCard(country);
    resultDiv.appendChild(countryCard);
  });
}

function renderError(message) {
  const resultDiv = document.getElementById("results-section");
  const errorMessage = createErrorMessage(message);
  resultDiv.appendChild(errorMessage);
}

async function handleSearch(term) {
  if (isSearching) {
    return;
  }

  isSearching = true;
  clearResults();
  disableSearchForm();
  showSpinner();

  try {
    const countries = await fetchCountry(term);

    hideSpinner();
    enableSearchForm();

    if (countries && countries.length > 0) {
      renderCountries(countries);
      addToHistory(term, handleSearch);
    } else {
      renderError();
    }
  } catch (error) {
    console.error("Error fetching country data:", error);
    hideSpinner();
    enableSearchForm();
    renderError("An error occurred while fetching country data.");
  } finally {
    isSearching = false;
  }
}

function app() {
  const searchSection = document.getElementById("search-section");
  const searchForm = createSearchForm(handleSearch);
  searchSection.appendChild(searchForm);

  updateSearchHistory(handleSearch);
}

document.addEventListener("DOMContentLoaded", app);
