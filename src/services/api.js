const BASE_URL = "https://restcountries.com/v3.1/";
const FIELDS = "name,capital,population,currencies,flags,maps";

export async function fetchCountry(countryName) {
  if (!countryName || typeof countryName !== "string") {
    throw new Error("Invalid country name");
  }

  try {
    const res = await fetch(
      `${BASE_URL}name/${encodeURIComponent(countryName)}?fields=${FIELDS}`
    );
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch country data");
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch (error) {
    throw new Error("Failed to fetch country data");
  }
}
