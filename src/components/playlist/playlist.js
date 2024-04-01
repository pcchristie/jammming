import React, { useState } from 'react';
import Track from '../track/track';
import styles from './playlist.module.css'

function Playlist({ className, playlist, createPlaylist, handleTitleChange, handleRemove, accessToken, userID, title, playlistData }) {

    return (
        <div className={className}>
            {
                (playlist.length === 0) ? null :
                    <div className={styles.addContainer}>
                        <input className={styles.input} type="text" placeholder="My Playlist" maxLength="20" onChange={handleTitleChange} />
                        <button className={styles.button} onClick={() => createPlaylist(accessToken, userID, title, playlistData)}>
                            Add to Spotify
                            <img src={process.env.PUBLIC_URL + '/media/spot_white_filled_100.png'} style={{height: '20px', width: '20px'}} />
                            </button>
                    </div>
            }
            {playlist.map((track) => (
                < Track key={track.id} title={track.title} artist={track.artist} uri={track.uri} isResult={false} handleRemove={handleRemove} trackObj={track} />
            )
            )}
        </div>
    )
}

export default Playlist;