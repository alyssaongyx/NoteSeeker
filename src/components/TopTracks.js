// // TopTracks.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TopTracks = ({ token }) => {
//   const [topTracks, setTopTracks] = useState([]);

//   useEffect(() => {
//     const fetchTopTracks = async () => {
//       try {
//         const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             limit: 10, // Specify the number of top tracks to retrieve, you can adjust this value
//           },
//         });

//         setTopTracks(response.data.items);
//       } catch (error) {
//         console.error('Error fetching top tracks:', error);
//       }
//     };

//     fetchTopTracks();
//   }, [token]);

//   return (
//     <div>
//       <h2>Top Tracks</h2>
//       <ul>
//         {topTracks.map((track) => (
//           <li key={track.id}>{track.name} - {track.artists.map((artist) => artist.name).join(', ')}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TopTracks;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopTracks = ({ token, setTopTracks, topTracks }) => {
  // const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 10, // Specify the number of top tracks to retrieve, you can adjust this value
          },
        });

        setTopTracks(response.data.items);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchTopTracks();
  }, [token, setTopTracks]);

  return (
    <div>
      <h2>Top Tracks</h2>
      <ul>
        {topTracks.map((track) => (
          <li key={track.id}>{track.name} - {track.artists.map((artist) => artist.name).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
