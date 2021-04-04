import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ filteredCountry, weather, setWeather }) => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${filteredCountry.name}`)
    .then(res => setWeather(res.data))

  if (weather) {
    console.log(filteredCountry.name);
    return (
      <div>
        <h2>Weather in {filteredCountry.name}</h2>
        <p><b>temperature: </b>{weather.current.temperature} Celcius</p>
        <p><img src={weather.current.weather_icons[0]} /></p>
        <p><b>wind: </b>{weather.current.wind_speed} kmh direction in {weather.current.wind_dir}</p>
      </div>
    )
  } else {
    return (
      <div>
        no weather report
      </div>
    )
  }

}

const SuggestCountry = ({ all, country, weather, setWeather }) => {

  if (Array.isArray(all)) {
    let temp = all.filter(c => c.name.toUpperCase().indexOf(country.toUpperCase()) > -1)
      .map(filteredCountry => (
        <div>
          <p>{filteredCountry.name} <button onClick={() => {
            // let t = [filteredCountry]
            //   console.log([filteredCountry]);
            //   console.log(Array.isArray([filteredCountry]));
              console.log(filteredCountry.name);
              
              return (
                <div>
                <h1>{filteredCountry.name}</h1>
                {/* <p>capital {filteredCountry.capital} <br />
                population {filteredCountry.population}</p>
        
                <h2>languages</h2>
                <ul>
                  {filteredCountry.languages.map(language => (<li>{language.name}</li>))}
                </ul>
                <img src={filteredCountry.flag} /> */}
                </div>
              )
          }} >show</button></p>

        </div>
      )
    )
    let length = temp.length

    if (length === 1) {
    let temp = all.filter(c => c.name.toUpperCase().indexOf(country.toUpperCase()) > -1).map(
      filteredCountry => {
        

        // console.log(temp)
        return (
            <div>
            <h1>{filteredCountry.name}</h1>
            <p>capital {filteredCountry.capital} <br />
            population {filteredCountry.population}</p>

            <h2>languages</h2>
            <ul>
              {filteredCountry.languages.map(language => (<li>{language.name}</li>))}
            </ul>
            <img width="300" height="200" src={filteredCountry.flag} />

            <Weather 
              filteredCountry={filteredCountry} 
              weather={weather}
              setWeather={setWeather} 
            />

            </div>
        )
      }
    
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
  const [weather, setWeather] = useState("")

  // console.log("env api", process.env.REACT_APP_API_KEY)



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
      <p>find countries <input value={country} onChange={handleCountryName} autoFocus /></p>
      <SuggestCountry 
        all={all} 
        country={country}
        weather={weather}
        setWeather={setWeather}
      />

    </div>
  )

}

export default App