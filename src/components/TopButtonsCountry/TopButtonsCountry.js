import React from 'react'
import classes from './TopButtonsCountry.module.css'

function TopButtonsCountry(props) {
    let cities = [
        {
            id: 1,
            title: 'London'
        },
        {
            id: 2,
            title: 'Sydney'
        },
        {
            id: 3,
            title: 'Tokyo'
        },
        {
            id: 4,
            title: 'Toronto'
        },
        {
            id: 5,
            title: 'Paris'
        }
    ]
    
    return (
        <div className={classes.wrapCountys}>
            {cities.map((item) =>
                <button key={item.id} className={classes.btnCity}
                    onClick={() => props.setGuery(item.title)}>
                    {item.title}
                </button>
            )}
        </div>
    )
}

export default TopButtonsCountry
