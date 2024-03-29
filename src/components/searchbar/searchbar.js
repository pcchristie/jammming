import React, {useState} from 'react';

function SearchBar({className, search, setSearch, handleSubmit}) {

    return (
        <div className={className}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    type="text"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;