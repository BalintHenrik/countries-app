export function createElement(tag, className = "") {
  const element = document.createElement(tag);
  if (className && className.length > 0) {
    element.className = className;
  }
  return element;
}

export function createImage(src, alt = "", className = "") {
  const img = createElement("img", className);
  img.src = src;
  img.alt = alt;
  return img;
}

export function createLink(href, text, className = "", isExternal = true) {
  const link = createElement("a", className);
  link.href = href;
  link.textContent = text;

  if (isExternal) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  return link;
}

export function createInfoItem(
  className,
  label,
  labelClassName,
  value,
  valueClassName,
) {
  const item = createElement("div", className);

  const labelSpan = createElement("span", labelClassName);
  labelSpan.textContent = `${label}: `;

  const valueSpan = createElement("span", valueClassName);
  valueSpan.textContent = value;

  item.appendChild(labelSpan);
  item.appendChild(valueSpan);

  return item;
}

export function appendChildren(parent, ...children) {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

export function clearElementChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
