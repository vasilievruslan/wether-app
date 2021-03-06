function Forecast({ forecast }) {
    const getDateString = (date) => {
        const dateWrap = new Date(date);
        return dateWrap.toGMTString().split(' ').splice(0, 3).join(' ')
    };

    return ( 
        <ul className="forecast">
            {forecast.map(({ day, date, date_epoch }) => 
                <li key={date_epoch} className="forecast-item">
                    <div className="forecast-day">{getDateString(date)}</div>
                    <div className="forecast-temp">{day.avgtemp_c}&#176;</div>
                    <div className="forecast-condition">
                        <img className="forecast-condition-icon" src={day.condition.icon} alt={day.condition.text} />
                        <span className="forecast-condition-text">{day.condition.text}</span>
                    </div>
                </li>
            )}
        </ul>
     );
}

export default Forecast;