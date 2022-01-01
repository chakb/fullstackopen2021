import React from "react";
import Weather from './Weather'

const DisplayCountryInfo = ({ country }) => {

    if (country === '') return null
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital[0]}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
        <Weather city={country.capital[0]} />
      </div>
    )
  }

  export default DisplayCountryInfo