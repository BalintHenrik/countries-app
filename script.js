function createForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter country name';
    input.required = true;
    input.style.margin = '10px';
    input.style.padding = '5px';
    input.style.width = '400px';
    input.style.height = '30px';
    input.style.fontSize = '16px';
    input.style.textAlign = 'center';
    input.style.border = '2px solid lightblue';
    input.style.borderRadius = '8px';

    const button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Search';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = 'lightblue';
    button.style.border = 'none';
    button.style.borderRadius = '8px';
    button.style.margin = '10px';

    form.appendChild(input);
    form.appendChild(button);

    return { form, input };
}

function createCountryCard(countryData) {
    const countryDiv = document.createElement('div');
    countryDiv.className = 'country-result';
    countryDiv.style.border = '2px solid lightgray';
    countryDiv.style.borderRadius = '10px';
    countryDiv.style.padding = '20px';
    countryDiv.style.margin = '20px auto';
    countryDiv.style.width = '400px';
    countryDiv.style.textAlign = 'center';
    countryDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    const name = document.createElement('h2');
    name.innerText = countryData.name.common;

    const capital = document.createElement('p');
    capital.innerText = `Capital: ${countryData.capital[0]}`

    const population = document.createElement('p');
    const fmt = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 0 });
    const populationText = fmt.format(countryData.population);
    population.innerText = `Population: ${populationText}`

    const currency = document.createElement('p');
    const currencyKey = Object.keys(countryData.currencies)[0];
    currency.innerText = `Currency: ${countryData.currencies[currencyKey].name} (${countryData.currencies[currencyKey].symbol})`;

    const flag = document.createElement('img');
    flag.src = countryData.flags.png;
    flag.alt = `Flag of ${countryData.name.common}`;
    flag.width = 100;
    flag.style.marginTop = '10px';
    flag.style.margin = '10px auto';
    flag.style.display = 'block';

    const mapLink = document.createElement('a');
    mapLink.href = countryData.maps.googleMaps;
    mapLink.innerText = 'Google Maps';
    mapLink.target = '_blank';

    countryDiv.appendChild(name);
    countryDiv.appendChild(capital);
    countryDiv.appendChild(population);
    countryDiv.appendChild(currency);
    countryDiv.appendChild(flag);
    countryDiv.appendChild(mapLink);

    return countryDiv;
}

function clearPreviousResults() {
    const previousResults = document.querySelectorAll('.country-result');
    previousResults.forEach(result => result.remove());

    const errorMessages = document.querySelectorAll('.error-message');
    if (errorMessages) {
        errorMessages.forEach(message => message.remove());
    }
}

async function fetchCountry(countryName) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            throw new Error(res.statusText);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching country data:', error);
        return null;
    }
}

function app() {
    const body = document.querySelector('body');

    const h1 = document.createElement('h1');
    h1.innerText = 'Country search';
    h1.style.textAlign = 'center';

    const formDiv = document.createElement('div');
    formDiv.style.textAlign = 'center';

    const { form, input } = createForm();
    formDiv.appendChild(form);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearPreviousResults();
        const countryName = input.value.toLowerCase().trim();
        const data = await fetchCountry(countryName);
        if (data) {
            console.log('Country data:', data);
            data.forEach(country => {
                const countryDiv = createCountryCard(country);
                body.appendChild(countryDiv);
            });
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerText = 'Country not found. Please try again.';
            errorDiv.style.color = 'red';
            errorDiv.style.textAlign = 'center';
            body.appendChild(errorDiv);
        }
        input.value = '';
    });
    body.appendChild(h1);
    body.appendChild(formDiv);
}

app();
