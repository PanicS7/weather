import React from "react";

function DayData (props) {
    // props
    const {date,temp,wind,speed,desc,icon} = props;

    return (
        <div className="weekday"> 
            <div className="weekdata-date">
                {date !== undefined ? date.substring(0,10) : null}
            </div>

            <div className='weekday-description'>
                {desc}
            </div>
                
            <div className='weekday-icons'>
                {icon !== undefined ? 
                    <img alt="icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/> 
                : null }
            </div>

            <div className='weekday-temp'>
                <p>Min: {temp !== undefined ? temp.min : null} &deg;C</p>
                <p>Max: {temp !== undefined ? temp.max : null} &deg;C</p>            
            </div>

            <div className='weekday-wind'>
              Wind direction: {wind}  
            </div>
            
            <div className='weekday-windspeek'>
                Wind speed: {speed} m/s
            </div>
                
        </div>
    )
}

export default DayData;