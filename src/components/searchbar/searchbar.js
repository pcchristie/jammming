import React, {useState} from 'react';
import styles from './searchbar.module.css'

function SearchBar({className, search, setSearch, handleSubmit}) {

    return (
        <div className={className}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    className={styles.searchBarInput}
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    type="text"
                />
                <button type="submit" className={styles.searchBarSubmit}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;