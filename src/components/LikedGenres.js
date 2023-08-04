// // LikedGenres.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LikedGenres = ({ token }) => {
//   const [likedGenres, setLikedGenres] = useState([]);

//   useEffect(() => {
//     const fetchLikedGenres = async () => {
//       try {
//         const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             time_range: 'short_term', // or 'medium_term' or 'long_term'
//             limit: 50, // adjust this value based on how many top artists you want to retrieve
//           },
//         });

//         // Extract genres from the top artists
//         const genres = response.data.items.flatMap((artist) => artist.genres);
//         // Remove duplicate genres
//         const uniqueGenres = [...new Set(genres)];

//         setLikedGenres(uniqueGenres);
//         // console.log('LikedGenres:', response.data.items);
//       } catch (error) {
//         console.error('Error fetching liked genres:', error);
//       }
//     };

//     fetchLikedGenres();
//   }, [token]);

//   return (
//     <div>
//       <h2>Liked Genres</h2>
//       <ul>
//         {likedGenres.map((genre, index) => (
//           <li key={index}>{genre}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LikedGenres;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LikedGenres = ({ token, setGenres }) => {
  const [likedGenres, setLikedGenres] = useState([]);

  useEffect(() => {
    const fetchLikedGenres = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 10, // Specify the number of top artists to retrieve, you can adjust this value
          },
        });

        // Extract and set the liked genres from the response
        const genres = response.data.items.reduce((acc, artist) => {
          return [...acc, ...artist.genres];
        }, []);

        // Remove duplicate genres and set the state
        setLikedGenres([...new Set(genres)]);
        setGenres([...new Set(genres)]); // Pass the liked genres to the parent component
      } catch (error) {
        console.error('Error fetching liked genres:', error);
      }
    };

    fetchLikedGenres();
  }, [token, setGenres]);

  return (
    <div>
      <h2>Liked Genres</h2>
      <ul>
        {likedGenres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default LikedGenres;

