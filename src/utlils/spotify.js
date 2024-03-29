const Spotify = {
    async requestUserAuth() {
        const generateRandomString = (length) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        }
            
        const codeVerifier  = generateRandomString(64);

        const sha256 = async (plain) => {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        }
        
        const base64encode = (input) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }
        
        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);
        
        const clientId = '54b0761d570c4af584b806cb816f03b0';
        const redirectUri = 'http://localhost:3000/callback';
        
        const scope = 'playlist-modify-private playlist-modify-public';
        const authUrl = new URL("https://accounts.spotify.com/authorize")
        
        // generated in the previous step
        window.localStorage.setItem('code_verifier', codeVerifier);
        
        const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
        }
        
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();

    },

    retrieveAuthCode: function() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    },

    getToken: async function(authCode) {
    
        const clientId = '54b0761d570c4af584b806cb816f03b0';
        const redirectUri = 'http://localhost:3000/callback';
        const url = 'https://accounts.spotify.com/api/token'
        const authCodeToSend = authCode;


        let codeVerifier = localStorage.getItem('code_verifier'); 

        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: authCodeToSend,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          }),
        }
      
        const body = await fetch(url, payload);
        const response = await body.json();
      
        localStorage.setItem('access_token', response.access_token);
        return response.access_token;
    },

    getUserData: async function(accessToken) {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        })

        if (!response.ok) {
          throw new Error('Error: Response not OK:', Error);
        }

        const userData = await response.json();
        return userData;

      } catch (error) {
          console.error('Error: ', error);
      }

    },

    createPlaylist: async function(accessToken, userID, title, playlistData) {
      try {
        const createEndpoint = `https://api.spotify.com/v1/users/` + userID + `/playlists`

        const createPayload = {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: title,
            description: 'Made with PCCs App',
            public: true,
          }),
        }

        console.log(`going to send userID of ${userID} and title of ${title} and accessToken of ${accessToken} as part of the payload including ${createEndpoint}`)

        const response = await fetch(createEndpoint, createPayload)
        const createResponse = await response.json();
        // console.log(createResponse);
        const newPlaylistId = createResponse.id;
        console.log(`the ID of the new playlist is ${newPlaylistId}`);
       
        try {
          const pushEndpoint = `https://api.spotify.com/v1/playlists/` + newPlaylistId + `/tracks`

          // console.log(`augmenting playlistData array...`)
          const payloadArray = playlistData.map(track => track.uri);
          // console.log(`done - the track data to be sent is as follows...`)
          // console.log(payloadArray);

          const pushPayload = {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uris: payloadArray,
              position: 0
            }),
          }

          const response = await fetch(pushEndpoint, pushPayload)
          const pushResponse = await response.json()
          console.log(pushResponse);

        } catch (error) {
         console.error('Error when pushing tracks: ', error) 
        }
      } catch (error) {
        console.error('Error when creating playlist: ', error);
      }
    }
}

export default Spotify;