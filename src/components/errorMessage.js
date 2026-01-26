import { createElement } from "../utils/dom.js";

export function createErrorMessage(
  message = "Country not found. Please try again.",
) {
  const div = createElement("div", "error-message fade-in");
  div.ariaLabel = "Error message";
  div.textContent = message;
  return div;
}
