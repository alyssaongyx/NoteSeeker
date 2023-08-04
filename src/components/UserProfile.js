// UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ token }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Display Name: {userData.display_name}</p>
          <p>Email: {userData.email}</p>
          <p>Followers: {userData.followers.total}</p>
          {/* Add more information you want to display from the user's profile */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
