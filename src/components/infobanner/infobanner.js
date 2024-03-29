import React from "react";

function InfoBanner(props) {
    return (
        <div className={props.className}>
            <h2>About</h2>
            <p>Use this app to make a playlist</p>
        </div>
    )
}

export default InfoBanner;