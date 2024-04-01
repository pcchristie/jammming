import React from "react";
import Track from "../track/track";
import styles from './searchresults.module.css'

function SearchResults({className, results, handleAdd}) {

    return (
        <div className={className}>
            {results.map((track) => (
            < Track className={styles.track} key={track.id} title={track.title} artist={track.artist} uri={track.uri} isResult={true} handleAdd={handleAdd} trackObj={track}/>
            )
        )}
        </div>
    )
}

export default SearchResults;