export async function fetchCountry(countryName) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,currencies,flags,maps`
    );
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(res.statusText);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return null;
  }
}
