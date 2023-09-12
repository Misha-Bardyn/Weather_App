import React from 'react'
import classes from './TimeAndLocation.module.css'

function TimeAndLocation({ weather: { name, country, localTime, localDate } }) {

    return (
        <div>
            <div className={classes.wrapperTime}>
                <p className={classes.time}>
                    {`${localDate} | Local time: ${localTime.slice(0, 2) === '24' ? '00' + localTime.slice(2, 5) : localTime } PM`}
                </p>
            </div>
            <div className={classes.wrapperLocal}>
                <p className={classes.local}>
                    {`${name}, ${country}`}
                </p>
            </div>
        </div>
    )
}

export default TimeAndLocation
