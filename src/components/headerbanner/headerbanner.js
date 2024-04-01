import React from "react";
import style from './headerbanner.module.css'

function HeaderBanner(props) {
    return (
        <div className={props.className}>
            <h1>The Playlist Maker</h1>
        </div>
    )
}

export default HeaderBanner;