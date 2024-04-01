import React from "react";
import styles from './headerbanner.module.css'

function HeaderBanner(props) {
    return (
        <div className={props.className}>
            <h1 className={styles.h1}>The Playlist Maker</h1>
        </div>
    )
}

export default HeaderBanner;