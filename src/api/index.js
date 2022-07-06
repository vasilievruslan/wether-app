const API_KEY = process.env.REACT_APP_API_KEY;
const endpoint = 'https://api.weatherapi.com/v1/'

const getCurrentWether = async (city) => {
    return await fetch(`${endpoint}current.json?key=${API_KEY}&q=${city}&aqi=no`)
        .then(data => data.json())
}

const getForecast = async (city) => await fetch(`${endpoint}forecast.json?key=${API_KEY}&q=${city}&days=10&aqi=no&alerts=no
`).then(data => data.json())

const search = async (query) => await fetch(`${endpoint}search.json?key=${API_KEY}&q=${query}`).then(data => data.json())

export { getCurrentWether, getForecast, search }