import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SuggestCountry = ({ all, country, setSuggestCountry }) => {

  if (Array.isArray(all)) {
    let temp = all.filter(c => c.name.toUpperCase().indexOf(country.toUpperCase()) > -1).map(filteredCountry => (<p>{filteredCountry.name}</p>))
    let length = temp.length

    if (length === 1) {
    let temp = all.filter(c => c.name.toUpperCase().indexOf(country.toUpperCase()) > -1).map(
      filteredCountry => (
        <div>
        <h1>{filteredCountry.name}</h1>
        <p>capital {filteredCountry.capital} <br />
        population {filteredCountry.population}</p>

        <h2>languages</h2>
        <ul>
          {filteredCountry.languages.map(language => (<li>{language.name}</li>))}
        </ul>
        <img src={filteredCountry.flag} />
        </div>
      )
    )

      return (
        <div>
          {temp}
        </div>
      )
    }


    if (length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }

    // console.log("length", length);
    // console.log("temp", temp);
    // setSuggestCountry(temp)

  // console.log(Array.isArray(all));
  return (
    <div>
      {temp}
    </div>
  )
  }

  return (
    <div>
      none
    </div>
  )

}

const App = () => {
  const [country, setCountry] = useState('')
  const [all, setAll] = useState("")
  // const [suggestCountry, setSuggestCountry] = useState("")



  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => response.data)
      .then(res => {
        setAll(res)
      })
    // console.log(country)

  }, [])

  const handleCountryName = (e) => {
    setCountry(e.target.value)
    // console.log(all);
  }

  return (
    <div>
      <p>find countries <input value={country} onChange={handleCountryName} /></p>
      {/* {all} */}
      {/* {console.log(all[5].name === undefined ? "": all[5].name)} */}
      {/* debug: {country} */}
      <SuggestCountry 
        all={all} 
        country={country}
        // setSuggestCountry={setSuggestCountry}
      />

      {/* { all.filter(c => c.name.indexOf(country) > -1).map(filteredCountry => filteredCountry.name)} */}
    </div>
  )

}

export default App