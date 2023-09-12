//KEY API
const API_KEY = "099957f4ff1c3985055849ad1035df98";

// WEATHER REQUEST
const getWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;
    return await fetch(URL)
        .then((data) => data.json())
}

//GET ARRAY WITH TEMPERATURE AND ICONS FOR 5 DAYS
const formatCards = (list) => {
    let arrTempAndIcon = list.filter(reading => reading.dt_txt.includes("15:00:00"))
        .map((day) => {
            let temp = Math.round(day.main.temp)
            let icons = day.weather[0].icon
            return { temp, icons }
        })

    return arrTempAndIcon
}

// GET URL ICON
const makeIconURL = (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`;

//GET MAX AND MIN TEMPERATURE WITHIN 24 HOURS
const getMaxMinTemp = (list) => {
    let arrMaxMinTemp = []
    for (let i = 0; i <= 8; i++) {
        arrMaxMinTemp.push(list[i].main.temp_max, list[i].main.temp_min)
    }

    return arrMaxMinTemp
}

// GET TIME OF SUNRISE AND SUNSET
const getTimeSunRiseSet = (time, tzone) => new Date((tzone + (time)) * 1000).toUTCString().slice(17, 22)

// GET TIME IN MILLISECONDS RELATIVE TO THE TIME ZONE
let timemilisek
const tztimemilisek = (tz) => {
    let nowDate = new Date()
    let localTime = nowDate.getTime()
    let localOffset = nowDate.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    timemilisek = utc + (1000 * tz)

    return timemilisek
}

// GET LOCAL DATE AND TIME
const getLocalTimeAndDate = (tztimemilisek) => {
    let date = new Date(tztimemilisek).toLocaleDateString('en-us',
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })

    let time = new Date(tztimemilisek).toLocaleString('en-us',
        {
            hour12: false,
            hour: 'numeric',
            minute: "numeric",
        })

    return { date, time }
}

// SORT THE NECESSARY PARAMETERS
const formatCurrentWeather = (data) => {
    const { list } = data;
    const { country, name, timezone, sunset, sunrise } = data.city
    const { description, icon } = list[0].weather[0];
    const { temp, feels_like, humidity } = list[0].main;
    const { speed } = list[0].wind;

    return {
        arrTempAndIcon: formatCards(list),
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min: Math.min(...getMaxMinTemp(list)),
        temp_max: Math.max(...getMaxMinTemp(list)),
        humidity,
        country,
        speed,
        name,
        sunset: getTimeSunRiseSet(sunset, timezone),
        sunRise: getTimeSunRiseSet(sunrise, timezone),
        tztimemilisek: tztimemilisek(timezone),
        localTime: getLocalTimeAndDate(timemilisek).time,
        localDate: getLocalTimeAndDate(timemilisek).date
    }
}

//GET DAYS OF THE WEEK FROM THE LOCAL DATE
const daysOfWeek = (timeMiliSecond) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date(timeMiliSecond).getDay();
    return daysOfWeek.slice(today).concat(daysOfWeek.slice(0, today - 1));
}

// цього не було
const getFormattedWeatherData = async (search, units) => {
    let formattedCurrentWeather = await getWeatherData(search, units).then(formatCurrentWeather)
    return { ...formattedCurrentWeather }
}

export { getFormattedWeatherData, makeIconURL, daysOfWeek }