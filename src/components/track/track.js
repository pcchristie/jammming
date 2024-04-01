import React from "react";
import styles from './track.module.css'

function Track({trackObj, title, artist, isResult, handleAdd, handleRemove}) {
        
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <p className={styles.artist}>{artist}</p>
            {isResult ? (
                <button className={styles.addButton} onClick={() => handleAdd(trackObj)}>Add</button>
            ) : (
                <button className={styles.removeButton} onClick={() => handleRemove(trackObj)}>Remove</button>
            )}
        </div>
    )
}

export default Track;