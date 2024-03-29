import React from "react";

function Track({trackObj, title, artist, isResult, handleAdd, handleRemove}) {
        
    return (
        <div>
            <p>{title}</p>
            <p>{artist}</p>
            {isResult ? (
                <button onClick={() => handleAdd(trackObj)}>ADD</button>
            ) : (
                <button onClick={() => handleRemove(trackObj)}>DEL</button>
            )}
        </div>
    )
}

export default Track;