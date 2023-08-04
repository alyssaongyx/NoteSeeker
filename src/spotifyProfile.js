// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SpotifyProfile = ({ token }) => {
//   const [profile, setProfile] = useState(null);
//   const [topArtists, setTopArtists] = useState([]);
//   const [topGenres, setTopGenres] = useState([]);
//   const [suggestedTracks, setSuggestedTracks] = useState([]);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const userResponse = await axios.get('https://api.spotify.com/v1/me', { headers });
//         setProfile(userResponse.data);

//         const artistsResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
//           headers,
//           params: { limit: 5, time_range: 'short_term' },
//         });
//         setTopArtists(artistsResponse.data.items);

//         const genresResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
//           headers,
//           params: { limit: 5, time_range: 'short_term' },
//         });
//         const artistIds = genresResponse.data.items.map((artist) => artist.id);

//         if (artistIds.length > 0) {
//           const relatedArtistsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistIds[0]}/related-artists`, { headers });
//           const relatedArtistIds = relatedArtistsResponse.data.artists.map((artist) => artist.id);
//           const relatedArtistsTopTracksResponse = await axios.get(`https://api.spotify.com/v1/artists/top-tracks?country=US&ids=${relatedArtistIds.join(',')}`, { headers });
//           const relatedArtistsTopTracks = relatedArtistsTopTracksResponse.data.tracks;
//           const allArtistsTopTracks = [...artistsResponse.data.items, ...relatedArtistsTopTracks];
//           const genresCountMap = {};

//           allArtistsTopTracks.forEach((track) => {
//             track.artists.forEach((artist) => {
//               artist.genres.forEach((genre) => {
//                 genresCountMap[genre] = (genresCountMap[genre] || 0) + 1;
//               });
//             });
//           });

//           const sortedGenres = Object.keys(genresCountMap).sort((a, b) => genresCountMap[b] - genresCountMap[a]);
//           setTopGenres(sortedGenres.slice(0, 5));

//           const seedGenres = sortedGenres.slice(0, 3).join(',');
//           const seedArtists = artistIds.slice(0, 3).join(',');

//           const recommendationsResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
//             headers,
//             params: { seed_genres: seedGenres, seed_artists: seedArtists, limit: 10 },
//           });
//           setSuggestedTracks(recommendationsResponse.data.tracks);
//         } else {
//           setTopGenres([]);
//           setSuggestedTracks([]);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchProfileData();
//   }, [token]);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   // Check if top artists, genres, and suggested tracks are empty
//   const isTopArtistsEmpty = topArtists.length === 0;
//   const isTopGenresEmpty = topGenres.length === 0;
//   const isSuggestedTracksEmpty = suggestedTracks.length === 0;

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <p>Display Name: {profile.display_name}</p>
//       <p>Followers: {profile.followers.total}</p>

//       {isTopArtistsEmpty && <p>No top artists found.</p>}
//       {!isTopArtistsEmpty && (
//         <>
//           <h2>Top Artists</h2>
//           {topArtists.map((artist, index) => (
//             <p key={artist.id}>{index + 1}. {artist.name}</p>
//           ))}
//         </>
//       )}

//       {isTopGenresEmpty && <p>No top genres found.</p>}
//       {!isTopGenresEmpty && (
//         <>
//           <h2>Top Genres</h2>
//           {topGenres.map((genre, index) => (
//             <p key={genre}>{index + 1}. {genre}</p>
//           ))}
//         </>
//       )}

//       {isSuggestedTracksEmpty && <p>No suggested tracks found.</p>}
//       {!isSuggestedTracksEmpty && (
//         <>
//           <h2>Suggested Tracks</h2>
//           <ul>
//             {suggestedTracks.map((track) => (
//               <li key={track.id}>
//                 {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default SpotifyProfile;



