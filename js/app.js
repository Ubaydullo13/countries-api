document.addEventListener("DOMContentLoaded", function () {
    const countriesContainer = document.getElementById("countries");
    const toggleBtn = document.getElementById('toggle')
    const searchInput = document.getElementById("search");
    const filterDropdown = document.getElementById("filter");
    const filterBtn = document.querySelector('.dropdown-filter');
    const regionList = document.querySelector('ul');
    const closeModalBtn = document.getElementById("close");

  
    const apiUrl = "https://restcountries.com/v3.1/all";
  
    let countriesData = [];
  
    async function fetchCountries() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        countriesData = data;
        displayCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    }

    
    function displayCountries(countries) {
      countriesContainer.innerHTML = "";
      countries.forEach((country) => {
        const countryCard = createCountryCard(country);
        countriesContainer.appendChild(countryCard);
      });
      console.log(countries);
    }

  
    function createCountryCard(country) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div>
            <img src="${country.flags.png}" alt="${country.name.common}">
        </div>
        <div class="card-body">
            <h3 class="country-name">${country.name.common}</h3>
            <p>
                <strong>Population:</strong>
                ${country.population}
            </p>
            <p class="country-region">
                <strong>Region:</strong>
                ${country.region}
            </p>
            <p>
                <strong>Capital:</strong>
                ${country.capital}
            </p>
        </div>
      `;
      card.addEventListener('click', () => {
        modal.style.display = 'flex';
        showCountryDetails(country);
    });

      return card;
    }
  

    function showCountryDetails(country) {
      const modalBody = modal.querySelector('.modal-body');
        const modalImg = modal.querySelector('#flag');
      
        modalImg.src = country.flags.png;
      
        modalBody.innerHTML = `
        <div class = "modalInfo">
        <div class = "modalInfoLeft">
        <h2>${country.name.common}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.altSpellings[1]}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        </div>
        <div class ="modalInfoRight">
        <p>
            <strong>Top Level Domain:</strong>
            ${country.tld ? country.tld[0] : 'N/A'}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies && country.currencies.length > 0 ? `${country.currencies[0].code} (${country.currencies[0].name})` : 'N/A'}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages ? Object.values(country.languages).join(", ") : 'N/A'}
        </p>
        </div>
        </div>
        <div class="border_countries">
        <p>
        <strong>Border Countries:</strong>
        ${country.borders ? country.borders.join(", ") : 'No Borders'}
        </p>
        </div>
      `;
      }
      
  
    // Close modal when close button is clicked
    closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // toggle theme - dark & light
toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});
  
    // Event listener for search input
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredCountries = countriesData.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      );
      displayCountries(filteredCountries);
    });
  
    // Event listener for filter dropdown
    filterBtn.addEventListener("click", function () {
      regionList.style.display = "block";
    });
  
    // Event delegation for filter options
    filterDropdown.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        const region = event.target.textContent;
        const filteredCountries = countriesData.filter(
          (country) => region === "All" || country.region === region
        );
        displayCountries(filteredCountries);
        regionList.style.display = "none";
      }
    });
  
    fetchCountries();
  });
  
  
