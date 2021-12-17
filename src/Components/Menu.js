import React, { useEffect, useState } from 'react';
import cityList from "../cityList";
import Weather from './Weather';
var d2d = require('degrees-to-direction'); // convert wind degrees to direction

function Menu() {
    // state
    const [lat,setLat] = useState(44.787197);
    const [lon,setLon] = useState(20.457273);
    const [city,setCityName] = useState("Beograd");
    const [date,setDate] = useState([]);
    const [weekTemp,setWeekTemp] = useState([]);
    const [weekWind,setWeekWind] = useState([]);
    const [weekWindSpeed,setWeekWindSpeed] = useState([]);
    const [weekDescription,setWeekDescription] = useState([]);
    const [weekIcons,setWeekIcons] = useState([]);

    const handleLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);  
            setCityName(null); // reset city name to null if user select his location (this will overide if city is already selected)                 
        })      
    }

    const handleCitySelection = (cityLat,cityLon,cityName) => {
        setLat(cityLat);
        setLon(cityLon);
        setCityName(cityName);
    }

    useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=764a1faeebdf86da10ef5d41a81f7edd&units=metric&exclude=current,hourly,minutely,alerts`)
        .then(response => {
            if (response.ok) {
              return response.json()
            }
            throw response;
        }).then(result => {
            // day of week
            let d = result.daily.map(day => {
                let dateObject = new Date(day.dt * 1000).toLocaleString();
                return dateObject;
            });
            // temp for week
            let t = result.daily.map(day => {
                return day.temp;
            });
            // week wind
            let w = result.daily.map(day => {
                return d2d(day.wind_deg);
            });
            // week wind speed
            let ws = result.daily.map(day => {
                return day.wind_speed;
            });
            // week description
            let wd = result.daily.map(day => {
                return day.weather[0].description;
            });
            // week icons
            let wi = result.daily.map(day => {
                return day.weather[0].icon;
            });

            setDate(d);
            setWeekTemp(t);
            setWeekWind(w);
            setWeekWindSpeed(ws);
            setWeekDescription(wd);
            setWeekIcons(wi);

        }).catch(error => {
            console.error('Error:', error);
    });

    },[lat, lon]);
    
    

    return (
        <div className="menu">
            <div>
                <h1>Select city from list or <button className="locationButton" onClick={handleLocation}>use your location</button></h1>        
                <ul className='cityList'>
                    {cityList.map(city => {
                        return (
                            <li key={city.name}><button onClick={e => {handleCitySelection(city.lat, city.lon, city.name)}}>{city.name}</button></li>
                        )
                    })}          
                </ul> 
            </div>
            {lat !== null && lon !== null ?
            <Weather 
                lat={lat}
                lon={lon}
                city={city}
                date={date} 
                weekTemp={weekTemp} 
                weekWind={weekWind} 
                weekWindSpeed={weekWindSpeed} 
                weekDescription={weekDescription} 
                weekIcons={weekIcons} 
            /> : null}
        </div>
    );
}

export default Menu;