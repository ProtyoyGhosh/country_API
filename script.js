const searchInput = document.getElementById('searchInput');        /* caling input field */
const searchBtn = document.getElementById('searchBtn');            /* calling search button */
const countryId = document.getElementById('country-container');    /* calling the div where to add all html tags */
const countryDetails = document.getElementById('countryDetails');  /* clling details div */
const errorDiv = document.getElementById('error');                 /* calling the error handle div */

searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    searchInput.value = '';      /* clearing the input field */
    if (searchInput.value === '') {
        errorDiv.innerText = 'search field can not be empty';  /* kono kichu na likhe search dile */
    }

    const url = `https://restcountries.eu/rest/v2/name/${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
})

const displayData = counties => {
    countryId.innerHTML = '';      /* clearing the country div  */
    errorDiv.innerText = '';      /* clearing the error handle div */
    countryDetails.innerHTML = '';  /* clearing the country detail div */

    /* ulta palta search dile error handel,
    data mane countries er value jokhn server theke pabe na mane 404 pabe tokhn eta hbe*/
    if (counties.status === 404) {
        errorDiv.innerText = 'no result found';
    }
    else {
        errorDiv.innerText = '';
    }

    /* jkon data ba countries er value pabe tokhn sob kota country er jnne loop chalabo */
    for (const country of counties) {
        const div = document.createElement('div');
        div.classList.add('col-md-3')
        div.innerHTML = `
                <!-- image -->
                <div class="rounded overflow-hidden border p-2">
                    <img src="${country.flag}" class="w-100" alt="">
                </div>
                <!-- body -->
                <div class="py-2 d-flex justify-content-between align-items-center
                d-md-block text-md-center">
                    <h1>Name: ${country.name}</h1>
                    <h3>Capital: ${country.capital}</h3>
                    <p>Population: ${country.population}</p>
                    <button onclick="showDetails('${country.alpha3Code}')" class="btn btn-dark">Learn More</button>
                </div>
        `
        /* 47th line- onclick function use korle string hisabe likhte hbe, 
        parameter pass korleu string hisabe pass korte hbe,dynamicly parameter code nilam. */
        countryId.appendChild(div);
    }
}

// show deails part
function showDetails(code) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(res => res.json())
        .then(data => loadCountryDetail(data))
}
const loadCountryDetail = details => {
    countryDetails.innerHTML = `
            <div class="col-md-12">
                <h1>Region: ${details.region}</h1>    
                <p>Mother Tounge: ${details.languages[0].name}</p>
                <p>Currency: ${details.currencies[0].name}</p>
                <h3>Borders: ${details.borders}</h3>
            </div>
    `
    /* line 68-   details - object
                  deatils.languages- array
                  details.languages[0] - array er 1st object
                  deatils.languages[0].name - property we want
     same in line no 69**             
    */
}