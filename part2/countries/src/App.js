import React, { useState, useEffect } from "react";
import axios from 'axios'
import DisplayCountryInfo from "./components/DisplayCountryInfo";

const DisplayCountrySearch = ({ countries, handleCountryClick }) => {

  if (countries.length === 0) {
    return null
  }
  else if (countries.length === 1) {
    return <DisplayCountryInfo country={countries[0]} />
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
            <button onClick={handleCountryClick} value={country.name.common}>show</button>
          </div>
        )}
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>
        setCountries(response.data)
      )
  }, [])

  const handleCountryClick = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = countryFilter === ''
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <div>
      find countries <input value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} />
      <DisplayCountrySearch
        countries={countriesToShow}
        handleCountryClick={handleCountryClick}
      />
    </div>
  );
}

export default App;
