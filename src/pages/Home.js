import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import SearchArtists from '../components/SearchArtists';
import UserProfile from '../components/UserProfile';
import TopArtists from '../components/TopArtists';
import TopTracks from '../components/TopTracks';
import RecommendedSongs from '../components/RecommendedSongs';
import LikedGenres from '../components/LikedGenres';

export default function Home({ token, setToken, setTopArtists, topArtists, setTopTracks, topTracks, setLikedGenres, likedGenres, setArtists, artists, renderArtists }) {
    const CLIENT_ID = "1909525b7f8e482ba41cfb6caa151bb5";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-read-private user-read-email user-follow-read user-top-read";

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiresAt');
    // setTopArtists([]);
    // setTopTracks([]);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Spotify React</h1>
        {!token ? (
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`}>Login to Spotify</a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        {token ? (
           <div>
           <UserProfile token={token} /> 
           <TopArtists token={token} setTopArtists={setTopArtists} topArtists={topArtists} />
           <TopTracks token={token} setTopTracks={setTopTracks} topTracks={topTracks}/>
           <LikedGenres token={token} setGenres={setLikedGenres} />
           <RecommendedSongs token={token} topArtists={topArtists} topTracks={topTracks} likedGenres={likedGenres}/> 
           <SearchArtists token={token} setArtists={setArtists} artists={artists} renderArtists={renderArtists}/>
         </div>
        ) : (
          <h2>Please login</h2>
        )}
        {/* {renderArtists()} */}
      </header>
    </div>
  );
}