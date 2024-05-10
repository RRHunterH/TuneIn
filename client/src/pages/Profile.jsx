import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_FAVORITE_SONG, ADD_EVENT } from '../utils/mutations';

const ProfilePage = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [addFavoriteSong] = useMutation(ADD_FAVORITE_SONG);
  const [addEvent] = useMutation(ADD_EVENT);

  if (loading) return <div>Loading...</div>;
  if (!data || !data.me) return <div>Error: Unable to fetch profile data</div>;

  const { me: profile } = data;

  return (
    <div>
      <h1>Welcome, {profile.name}</h1>

      <h2>Your Favorite Songs</h2>
      <ul>
        {profile.favoriteSongs.map(song => (
          <li key={song._id}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>

      <h2>Your Favorite Events</h2>
      <ul>
        {profile.favoriteEvents.map(event => (
          <li key={event._id}>
            {event.eventName} - {event.eventDate} - {event.location}
          </li>
        ))}
      </ul>

      <button onClick={() => handleFavoriteSong(songId, songTitle, artist)}>Add Favorite Song</button>

      <button onClick={() => handleFavoriteEvent(eventName, eventDate, location)}>Add Favorite Event</button>
    </div>
  );
};

export default ProfilePage;
