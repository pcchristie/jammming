import {React, useState} from "react";
import Track from "../track/track";

function SearchResults({className, results, handleAdd}) {

    return (
        <div className={className}>
            {results.map((track) => (
            < Track key={track.id} title={track.title} artist={track.artist} uri={track.uri} isResult={true} handleAdd={handleAdd} trackObj={track}/>
            )
        )}
        </div>
    )
}

export default SearchResults;