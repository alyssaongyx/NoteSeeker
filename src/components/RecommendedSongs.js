// // RecommendedSongs.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RecommendedSongs = ({ token, topArtists, topTracks, likedGenres }) => {
//   const [recommendedSongs, setRecommendedSongs] = useState([]);

//   useEffect(() => {
//     const fetchRecommendedSongs = async () => {
//       try {
//         const seedArtists = topArtists.map((artist) => artist.id).join(',');
//         const seedTracks = topTracks.map((track) => track.id).join(',');
//         const seedGenres = likedGenres.join(',');
//         const response = await axios.get('https://api.spotify.com/v1/recommendations', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             seed_artists: seedArtists,
//             seed_tracks: seedTracks,
//             seed_genres: seedGenres,
//             limit: 10, // Specify the number of recommended songs to retrieve, you can adjust this value
//           },
//         });
//         setRecommendedSongs(response.data.tracks);
//       } catch (error) {
//         console.error('Error fetching recommended songs:', error);
//       }
//     };
//   })
    
//   return (
//     <div>
//       <h2>Recommended Songs</h2>
//       <ul>
//         {recommendedSongs.map((song) => (
//           <li key={song.id}>{song.name} - {song.artists.map((artist) => artist.name).join(', ')}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecommendedSongs;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedSongs = ({ token, topArtists, topTracks, likedGenres }) => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  var toFetch = false;

  useEffect(() => {
    const fetchRecommendedSongs = async (seedArtists, seedTracks, seedGenres) => {
      try {
        console.log("TopArtists:", seedArtists);
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            seed_artists: seedArtists,
            seed_tracks: seedTracks,
            seed_genres: seedGenres,
            limit: 10, // Specify the number of recommended songs to retrieve, you can adjust this value
          },
        });
  
        setRecommendedSongs(response.data.tracks);
        //toFetch = true;
        console.log("setting fetched")
      } catch (error) {
        console.error('Error fetching recommended songs:', error);
      }
    };

    // Check if there are top artists, top tracks, and liked genres before fetching recommended songs
    console.log("what is state " + (recommendedSongs.length));
    console.log("lengths " + topArtists.length + " " + topTracks.length + " " + likedGenres.length)
    if (toFetch != true && topArtists.length > 0 && topTracks.length > 0 && likedGenres.length > 0) {
      toFetch = true;
      topArtists = topArtists.slice(1);
      const seedArtists = topArtists.map((artist) => artist.id).join(',');
      topTracks = topTracks.slice(2); 
      const seedTracks = topTracks.map((track) => track.id).join(',');
      likedGenres = likedGenres.slice(2);
      const seedGenres = likedGenres.join(',');

      fetchRecommendedSongs(seedArtists, seedTracks, seedGenres);
    } else {
      console.warn('Cannot fetch recommended songs: Missing seeds'); 
    }
  }, [token, topArtists, topTracks, likedGenres]);

  return (
    <div>
      <h2>Recommended Songs</h2>
      <ul>
        {recommendedSongs.map((song) => (
          <li key={song.id}>{song.name} - {song.artists.map((artist) => artist.name).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedSongs;


