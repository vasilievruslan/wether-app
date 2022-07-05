import {useState} from 'react'
import { search } from '../api'
import { debounce } from 'lodash'

function SearchInput({ onChange }) {

    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([]);

    const debouncedSearch = debounce((value) => {
        search(value).then((res) => {
            setSearchResults(res)
        })
    }, 500);

    const handleChange = (e) => {
        debouncedSearch(e.target.value)
        setQuery(e.target.value)
    }

    const setCity = (city) => {
        setQuery(city.name)
        onChange(city);
        setSearchResults([]);
    };

    return ( 
        <div className="search">
            <input type="text" onChange={handleChange} placeholder="Enter city..." className="search-input" value={query} />

            {!!searchResults.length && <ul className='search-results'>
                { searchResults.map((el) => <li className='search-results-item' key={el.id} onClick={() => setCity(el)}>{el.name}, {el.country}</li>) }
            </ul>}
        </div>
    );
}

export default SearchInput;