import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_FAVORITE_SONG } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const SongsList = ({ songs, isLoggedInUser = false }) => {
  const [removeFavoriteSong, { error }] = useMutation(REMOVE_FAVORITE_SONG, {
    refetchQueries: [
      { query: QUERY_ME },  // Ensure data is refreshed after mutation
    ],
    onError: (err) => console.error('Error removing favorite song:', err),
  });

  const handleRemoveSong = async (songId) => {
    try {
      await removeFavoriteSong({
        variables: { songId },
      });
    } catch (err) {
      console.error('Error in handleRemoveSong:', err);
    }
  };

  if (!songs.length) {
    return <h3>No Favorite Songs Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {songs.map((song) => (
          <div key={song._id} className="col-12 col-xl-6">
            <div className="card mb-3">
              <h4 className="card-header bg-dark text-light p-2 m-0">
                <span>{song.title} by {song.artist}</span>
                {isLoggedInUser && (
                  <button
                    className="btn btn-sm btn-danger ml-auto"
                    onClick={() => handleRemoveSong(song._id)}
                  >
                    Remove
                  </button>
                )}
              </h4>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
    </div>
  );
};

export default SongsList;
