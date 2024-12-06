import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          // Check if the response is OK (status code 200-299)
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          // Parse the JSON from the response
          return response.json();
        })
        .then(data => {
          // Handle the parsed data
          console.log(data);
          setCountry({
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png

          });
        })
        .catch(error => {
          setCountry(undefined);
        });
    }
  }, [name]);

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App