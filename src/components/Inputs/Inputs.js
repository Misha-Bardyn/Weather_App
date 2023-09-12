import React, { useState } from 'react'
import classes from './Inputs.module.css'
import { FiSearch } from 'react-icons/fi';
function Inputs(props) {

  const [city, setCity] = useState('')
  const searchWeatherCity = function (city) {
    props.setGuery(city)
    setCity('')
  }

  return (
    <div className={classes.formInput}>
      <div className={classes.wrapInput}>
        <input type='text' placeholder='Search...' className={classes.input}
          value={city || ''} onChange={event => { setCity(event.target.value) }}
        />
        <FiSearch size={25} color='white' className={classes.iconSearch}
          onClick={() => { city ? searchWeatherCity(city) : alert('Please enter a city') }}
        />
      </div>
      <div className={classes.typeTemperche}>
        <button name='metric' className={classes.btnTemperche} onClick={() => props.setUnits('metric')}>
          °C
        </button>
        <p className={classes.line}>|</p>
        <button name='imperial' className={classes.btnTemperche} onClick={() => props.setUnits('imperial')}>
          °F
        </button>
      </div>
    </div>
  )
}

export default Inputs
