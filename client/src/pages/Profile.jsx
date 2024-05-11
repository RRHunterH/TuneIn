import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import FavoriteButton from '../components/Search/FavoriteButton';

const Profile = () => {
  // Fetch the logged-in user's profile data using QUERY_ME
  const { loading, data, error } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    window.location.href = '/login';
    return;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching profile: {error.message}</div>;
  if (!data || !data.me) return <div>Profile not found.</div>;

  const profile = data.me;

  return (
    <div>
      <h1>Profile: {profile.name}</h1>
      <p>Email: {profile.email}</p>
      <h2>Your Favorite Songs</h2>
      <ul>
        {profile.favoriteSongs?.map(song => (
          <li key={song._id}>
            {song.title} - {song.artist}
            <FavoriteButton 
              profileId={profile._id} 
              songId={song._id} 
              isFavorite={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
