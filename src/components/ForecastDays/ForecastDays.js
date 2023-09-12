import React from 'react'
import classes from './ForecastDays.module.css'
import { makeIconURL } from '../../servicec/WeatherService'
import { daysOfWeek } from '../../servicec/WeatherService';
function ForecastDays(props) {
    return (
        <div>
            <p className={classes.title}>daily forecast</p>
            <hr />
            <div className={classes.blockInfo}>
                <div className={classes.blockDay}>
                    {daysOfWeek(props.tztimemilisek).slice(0, 5).map((day, index) =>
                        <p key={index} className={classes.daysWeek}>{day}</p>)
                    }
                </div>
                <div className={classes.blockDay}>
                    {props.arrTempAndIcon.map((day, index) =>
                        <div key={index}>
                            <img src={makeIconURL(day.icons)} alt='icon_img' style={{ width: "65px", margin: "4px 0px" }} />
                            <p>{`${day.temp}°`}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )

}
export default ForecastDays
