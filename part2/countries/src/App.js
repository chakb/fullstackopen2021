import React, { useState, useEffect } from "react";
import axios from 'axios'

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </div>
  )
}

const DisplayCountrySearch = ({ countries }) => {

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }
  else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name.common}>
            {country.name.common}
          </div>
        )}
      </div>
    )
  }

}

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setcountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>
        setCountries(response.data)
      )
  }, [])

  const countriesToShow = countryFilter === ''
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <div>
      find countries <input value={countryFilter} onChange={(event) => setcountryFilter(event.target.value)} />
      <DisplayCountrySearch countries={countriesToShow} />
    </div>
  );
}

export default App;
