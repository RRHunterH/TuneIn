import React from 'react';
import { useQuery, gql } from '@apollo/client';

const QUERY_ME = gql`
  query Me {
    me {
      _id
      name
      email
      favoriteSongs {
        _id
        title
        artist
      }
    }
  }
`;

function Profile() {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  return (
    <div>
      <h1>Profile: {me.name}</h1>
      <p>Email: {me.email}</p>
      <h2>Your Favorite Songs</h2>
      <ul>
        {me.favoriteSongs.map(song => (
          <li key={song._id}>{song.title} by {song.artist}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
