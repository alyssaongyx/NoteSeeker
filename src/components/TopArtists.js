// // TopArtists.js
// // TopArtists.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TopArtists = ({ token }) => {
//   const [topArtists, setTopArtists] = useState([]);

//   useEffect(() => {
//     const fetchTopArtists = async () => {
//       try {
//         const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             limit: 10, // Specify the number of top artists to retrieve, you can adjust this value
//           },
//         });

//         setTopArtists(response.data.items);
//         // console.log('Top Artists:', response.data.items);
//       } catch (error) {
//         console.error('Error fetching top artists:', error);
//       }
//     };
//     if (token) {
//       fetchTopArtists();
//     }
//   }, [token]);

//   return (
//     <div>
//       <h2>Top Artists</h2>
//       <ul>
//         {topArtists.map((artist) => (
//           <li key={artist.id}>{artist.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TopArtists;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopArtists = ({ token, setTopArtists, topArtists }) => {
  // const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 10, // Specify the number of top artists to retrieve, you can adjust this value
          },
        });

        setTopArtists(response.data.items);
      } catch (error) {
        console.error('Error fetching top artists:', error);
      }
    };

    fetchTopArtists(); 
  }, [token, setTopArtists]);

  return (
    <div>
      <h2>Top Artists</h2>
      <ul>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
