// import { useEffect, useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const CLIENT_ID="1909525b7f8e482ba41cfb6caa151bb5"
//   const REDIRECT_URI="http://localhost:3000"
//   const AUTH_ENDPOINT= "https://accounts.spotify.com/authorize"
//   const RESPONSE_TYPE= "token"

//   const [token, setToken] = useState("")
//   const [searchKey, setSearchKey] = useState("")
//   const [artists, setArtists] = useState([])

//   useEffect(() => {
//     const hash = window.location.hash
//     let token = window.localStorage.getItem("token")

//     if (!token && hash) {
//       token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      
//       window.location.hash = ""
//       window.localStorage.setItem("token", token)
//     }
//     setToken(token)


//   }, [])

//   const logout = () => {
//     setToken("")
//     window.localStorage.removeItem("token")
//   }

//   const searchArtists = async (e) => {
//     e.preventDefault()
//     const {data} = await axios.get("https://api.spotify.com/v1/search", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       params: {
//         q: searchKey,
//         type: "artist"
//       }
//     })

//     setArtists(data.artists.items)
//   }

//   const renderArtists = () => {
//     return artists.map(artist => (
//       <div key={artist.id}>
//         {artist.images.length ? <img width={"100%"} src= {artist.images[0].url} alt=""/> : <div>No Image</div>}
//         {artist.name}
//       </div>
//     ))
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Spotify React</h1>
//         {!token?
//         <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
//         : <button onClick={logout}>Logout</button>}

//         {token ?
//           <form onSubmit={searchArtists}>
//             <input type='text' onChange={e => setSearchKey(e.target.value)}/>
//             <button type={"submit"}>Search</button>

//           </form>
//           : <h2>Please login</h2>
//         } 
//         {renderArtists()}
//       </header>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const CLIENT_ID = "1909525b7f8e482ba41cfb6caa151bb5";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getTokenFromStorage = () => {
      const storedToken = window.localStorage.getItem('token');
      const expiresAt = window.localStorage.getItem('expiresAt');
      if (storedToken && expiresAt) {
        if (new Date().getTime() < expiresAt) {
          setToken(storedToken);
        } else {
          refreshAccessToken();
        }
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
            // Add any required authentication headers or parameters for the refresh token request
          },
          params: {
            q: searchKey,
            type: 'artist',
          },
        });

        const newToken = response.data.access_token;
        const expiresAt = new Date().getTime() + response.data.expires_in * 1000;
        setToken(newToken);
        window.localStorage.setItem('token', newToken);
        window.localStorage.setItem('expiresAt', expiresAt);
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        // Handle error if refresh token request fails
      }
    };

    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem('token');

    if (!storedToken && hash) {
      storedToken = hash.substring(1).split('&').find((elem) => elem.startsWith('access_token')).split('=')[1];
      const expiresAt = new Date().getTime() + Number(hash.substring(1).split('&').find((elem) => elem.startsWith('expires_in')).split('=')[1]) * 1000;

      window.location.hash = '';
      window.localStorage.setItem('token', storedToken);
      window.localStorage.setItem('expiresAt', expiresAt);
    }

    setToken(storedToken);
    getTokenFromStorage();
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiresAt');
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: 'artist',
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? <img width={'100%'} src={artist.images[0].url} alt='' /> : <div>No Image</div>}
        {artist.name}
      </div>
    ));
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Spotify React</h1>
        {!token ? (
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {token ? (
          <form onSubmit={searchArtists}>
            <input type='text' onChange={(e) => setSearchKey(e.target.value)} />
            <button type={'submit'}>Search</button>
          </form>
        ) : (
          <h2>Please login</h2>
        )}
        {renderArtists()}
      </header>
    </div>
  );
}

export default App;


