import {React, useEffect, useState} from 'react';
import './App.css'
import SearchBar from '../searchbar/searchbar';
import Playlist from '../playlist/playlist'
import SearchResults from '../searchresults/searchresults';
import HeaderBanner from '../headerbanner/headerbanner';
import InfoBanner from '../infobanner/infobanner';
import Spotify from '../../utlils/spotify';

// TODO: Can I implement a sorting feature?
// TOTOD: Can we make the playlist title more like an editable <h2> than an input field? Perhaps this is just CSS/styling work.

const url = 'https://api.spotify.com/v1/search?&q='

function App() {

  const [authCode, setAuthCode] = useState();
  const [accessToken, setAccessToken] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    // Get Auth Code
    const code = Spotify.retrieveAuthCode();
    console.log('Attempted to retrieve Auth Code from Spotify...')
    if (code) {
      setAuthCode(code);
    } else {
      console.log('Nothing has happened; user has not clicked login OR authCode was not successfuly retrieved')
    }
  }, []);

  useEffect(() => {
    // If Auth Code was retrieved, confirm and use it to retrieve and set Access Token
    if (authCode) {
    console.log(`authCode successfuly changed to: ${authCode}, attempting to retrieve token...`);
    Spotify.getToken(authCode).then(token => {
      setAccessToken(token);
    }).catch(error => {
      console.error('Error retrieving Access Token: ', error);
    });
  }
  }, [authCode]);

  useEffect(() => {
    // Confirm Access Token changed if it has changed
    if (accessToken) {
      console.log(`accessToken successfuly changed to: ${accessToken}`);

      // Retrieve and Set UserID
      console.log(`retrieving user ID...`)
      const fetchUserData = async () => {
        try {
          const userDataObj = await Spotify.getUserData(accessToken);
          const userIdToSet = userDataObj.id
          console.log(`setting user ID...`)
          setUserID(userIdToSet);
        } catch (error) {
          console.error('Error fetching user ID:' + error);
        }
      }
      fetchUserData();
    }
  }, [accessToken]);

  useEffect(() => {
    if (userID) {
    console.log(`userID has been set to: ${userID}`)
  }
  }, [userID]);

  const [results, setResults] = useState([])
  const [playlist, setPlaylist] = useState([])
  const [nextIndex, setNextIndex] = useState(1)
  const [title, setTitle] = useState('');
  const [playlistData, setPlaylistData] = useState([]);
  const [search, setSearch] = useState('')

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function login() {
    Spotify.requestUserAuth();
  }

  function handleAdd(track) {
    setNextIndex(prevInd => prevInd + 1);
    const toAdd = {
      id: nextIndex,
      title: track.title,
      artist: track.artist,
      uri: track.uri
      };
    const toAddData = {
      id: nextIndex,
      uri: track.uri
    };
    setPlaylist(prev => [...prev, toAdd]);
    setPlaylistData(prev => [...prev, toAddData])
  }    

  function handleRemove(track) {
    setPlaylist(playlist.filter(i => track.id !== i.id));
    setPlaylistData(playlistData.filter(i => track.id !== i.id));
  }

function transformResults(results) {
  const transformedData = {
      resultsTracks: results.tracks.items.slice(0, 10).map((track, index) => ({
        id: index,
        title: track.name,
        artist: track.artists[0].name,
        uri: track.uri
      })),
    }
  return transformedData;
}

async function handleSubmit(e) {
    e.preventDefault();
    // console.log(accessToken);
    const searchQuery = search.replace(/\s+/g, '+')
    const trackSearch = '&type=track'
    const limit = '&limit=10'
    const endpoint = url+searchQuery+trackSearch+limit;
    console.log(endpoint)

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })

      if (!response.ok) {
        throw new Error('Request Failed!');
      }
      const data = await response.json();
      console.log(data);
      const dataManip = transformResults(data);
      console.log(dataManip.resultsTracks);
      setResults(dataManip.resultsTracks);

    } catch (error) {
        console.error('Error: ', error);
    }
}

  return (
    <div className="App">
      <HeaderBanner  className="HeaderBanner"/>
      <InfoBanner className="InfoBanner" accessToken={accessToken}/>
      {accessToken ? (
        <>
          <SearchBar className="SearchBar" search={search} setSearch={setSearch} handleSubmit={handleSubmit}/>
          <SearchResults className="SearchResults" results={results} handleAdd={handleAdd}/>
          <Playlist className="Playlist" playlist={playlist} playlistData={playlistData} handleRemove={handleRemove} handleTitleChange={handleTitleChange} createPlaylist={Spotify.createPlaylist} accessToken={accessToken} userID={userID} title={title}/>
        </>
      ) : (
        <button className="Login" onClick={login}>Log in with Spotify <img src={process.env.PUBLIC_URL + '/media/spot_white_filled_100.png'} style={{height: '30px', width: '30px'}} alt="spotify logo"/>
        </button>
      )}
    </div>
  );
}

export default App;