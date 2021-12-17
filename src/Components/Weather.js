import React from 'react';
import DayData from './DayData';

function Weather(props) {
    // props
    const lat = props.lat;
    const lon = props.lon;
    const city = props.city;
    const data = {
      "date" : props.date,
      "temp" : [...props.weekTemp],
      "weekWind" : props.weekWind,
      "weekWindSpeed" : props.weekWindSpeed,
      "weekDescription" : props.weekDescription,
      "weekIcons" : props.weekIcons
    }   
    // used to map and as index/key
    const list = [0,1,2,3,4,5,6,7];

    return (
        <div>
            <header className='cityInfo'>
              <h1>{city}</h1>
              <p>LAT:{lat}</p>
              <p>LON:{lon}</p>
            </header>
            <section className='week'>
              <h2>Next 7 days</h2>
              <div className='weekday-list'>        
              {
                list.map((id) => {

                  return (
                    <div key={id}>
                      <DayData
                        date={data.date[id]} 
                        temp={data.temp[id]}
                        wind={data.weekWind[id]}
                        speed={data.weekWindSpeed[id]}
                        desc={data.weekDescription[id]}
                        icon={data.weekIcons[id]}
                      />
                      <br/>
                    </div>
                  )
                })
              }
              </div>
            </section>
        </div>
    );
}

export default Weather;