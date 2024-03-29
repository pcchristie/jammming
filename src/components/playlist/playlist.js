import React, {useState} from 'react';
import Track from '../track/track';

function Playlist({className, playlist, createPlaylist, handleTitleChange, handleRemove, accessToken, userID, title, playlistData}) {

    return (
        <div className={className}>
            <input type="text" placeholder="My Playlist" maxLength="20" onChange={handleTitleChange}/>
            <button onClick={() => createPlaylist(accessToken, userID, title, playlistData)}>Add to Spotify</button>
            {playlist.map((track) => (
            < Track key={track.id} title={track.title} artist={track.artist} uri={track.uri} isResult={false} handleRemove={handleRemove} trackObj={track}/>
            )
        )}
        </div>
    )   
}

export default Playlist;