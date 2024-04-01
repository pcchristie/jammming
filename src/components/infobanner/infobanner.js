import React from "react";

function InfoBanner(props) {
    return (
        <div className={props.className}>
            <h3>This web app allows you to quickly search for songs on Spotify, add them to a draft playlist, and push it to your Spotify account.</h3>
            {!props.accessToken ? 
            <>
            <p>Click the log in button below to begin</p>
            </>
            :
            <>
            <p>Start by searching for a song using the search bar below, and add any results you like into your playlist. Continue until you're happy, then name your playlist and click "Add to Spotify" to add it to your account.</p>
            </>}
        </div>
    )
}

export default InfoBanner;