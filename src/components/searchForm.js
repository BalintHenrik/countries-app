import { createElement } from "../utils/dom.js";
import { createErrorMessage } from "./errorMessage.js";

export function createSearchForm(onSubmit) {
  const form = createElement("form", "search-form");
  form.id = "search-form";

  const input = createElement("input", "search-input");
  input.type = "search";
  input.id = "country-search";
  input.placeholder = "Enter country name...";
  input.required = true;
  input.minLength = 3;
  input.autocomplete = "off";

  const button = createElement("button", "search-btn");
  button.type = "submit";
  button.id = "search-btn";
  button.textContent = "Search";

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputValue = input.value.trim();
    if (inputValue && inputValue.length >= 3) {
      onSubmit(inputValue);
      input.value = "";
    } else if (inputValue.length > 0 && inputValue.length < 3) {
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        resultsSection.innerHTML = "";
        const errorMsg = createErrorMessage(
          "Please enter at least 3 characters to search.",
        );
        resultsSection.appendChild(errorMsg);
      }
    }
  });

  return form;
}

export function disableSearchForm() {
  const btn = document.getElementById("search-btn");
  if (btn) {
    btn.disabled = true;
  }
}

export function enableSearchForm() {
  const btn = document.getElementById("search-btn");
  if (btn) {
    btn.disabled = false;
  }
}
