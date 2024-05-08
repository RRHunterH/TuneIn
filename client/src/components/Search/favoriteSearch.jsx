import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_SONG, REMOVE_FAVORITE_SONG } from '../graphql/mutations';
const FavoriteButton = ({ profileId, songId, isFavorite }) => {
  const [addFavoriteSong] = useMutation(ADD_FAVORITE_SONG);
  const [removeFavoriteSong] = useMutation(REMOVE_FAVORITE_SONG);
  const handleAddFavoriteSong = async () => {
    try {
      await addFavoriteSong({
        variables: { profileId, songId }
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
  const handleRemoveFavoriteSong = async () => {
    try {
      await removeFavoriteSong({
        variables: { profileId, songId }
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };
  return (
    <button onClick={isFavorite ? handleRemoveFavoriteSong : handleAddFavoriteSong}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};
export default FavoriteButton;