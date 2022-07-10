function Hours({hours}) {
    return ( 
        <div className="hours">
            <ul className="hours-list">
                {hours.map((el) => 
                    <li className="hours-item">
                        <div className="hours-time">{ el.time.split(' ')[1] }</div>
                        <div className="hours-temp">{el.temp_c}&#176;</div>
                        <img src={el.condition.icon} alt={el.condition.text} className="hours-condition-icon" />
                    </li>
                )}
            </ul>
        </div>
        
     );
}

export default Hours;