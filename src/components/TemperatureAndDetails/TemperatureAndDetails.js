import React from 'react'
import classes from './TemperatureAndDetails.module.css'
import { CiTempHigh } from 'react-icons/ci';
import { CiDroplet } from 'react-icons/ci';
import { BiWind } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';
import { TbSunset2 } from 'react-icons/tb';
import { CiSun } from 'react-icons/ci';

function TemperatureAndDetails({ weather:
    {
        description,
        iconURL,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        speed,
        sunset,
        sunRise
    }
}) {

    return (
        <div>
            <div className={classes.weather}>
                <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
            </div>
            <div className={classes.blockImg}>
                <img src={iconURL} alt='icon_img' />
                <p>{`${temp.toFixed()}°`}</p>
                <div className={classes.weatherDetails}>
                    <div className={classes.detail}>
                        <CiTempHigh size={19} /> Real fell:
                        <span>{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className={classes.detail}>
                        <CiDroplet size={18} /> Humidity:
                        <span>{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className={classes.detail}>
                        <BiWind size={18} /> Wind:
                        <span>{`${speed} km/h`}</span>
                    </div>
                </div>
            </div>
            <div className={classes.sunInfo}>
                <ImSun size={18} />
                <p>
                    Rise:<span>{`${sunRise} AM`}</span>
                </p>
                <p>|</p>
                <TbSunset2 size={20} />
                <p>
                    Set:<span>{`${sunset} AM`}</span>
                </p>
                <p>|</p>
                <ImSun size={18} />
                <p>
                    High:<span>{`${temp_max.toFixed()}°`}</span>
                </p>
                <p>|</p>
                <CiSun size={22} />
                <p>
                    Low:<span>{`${temp_min.toFixed()}°`}</span>
                </p>
            </div>
        </div>
    )
}

export default TemperatureAndDetails
