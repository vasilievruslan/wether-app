function Card({location, current}) {
    return ( <div className="card">
    <div className="card-header">
        <div>
            <h2 className="card-title">{location.name}</h2>
            <h4 className="card-subtitle">{location.country}, {location.region}</h4>
        </div>
        <div className="card-condition">
            <img src={current.condition.icon} alt={current.condition.text} />
            <span className="card-condition__text">{current.condition.text}</span>
        </div>
    </div>
    <div className="card-content">
        <div className="card-temp">{current.temp_c}&#176;</div>
    </div>
</div> );
}

export default Card;