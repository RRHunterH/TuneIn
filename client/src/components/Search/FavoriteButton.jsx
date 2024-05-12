import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_SONG, REMOVE_FAVORITE_SONG } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import AuthService from '../../utils/auth';

const FavoriteButton = ({ songId, songTitle, artist, isFavoriteInitially }) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);
  const [userProfileId, setUserProfileId] = useState(null);

  // Set the user profile ID from AuthService on component mount
  useEffect(() => {
    const profile = AuthService.getProfile();
    if (profile && profile._id) {
      setUserProfileId(profile._id);
    }
  }, []);

  const [addFavoriteSong, { error: addError, loading: addLoading }] = useMutation(ADD_FAVORITE_SONG, {
    variables: { profileId: userProfileId, songId, songTitle, artist },
    refetchQueries: [{ query: QUERY_ME }],
    onError: (error) => console.error('Error adding favorite song:', error),
    onCompleted: () => setIsFavorite(true)
  });

  const [removeFavoriteSong, { error: removeError, loading: removeLoading }] = useMutation(REMOVE_FAVORITE_SONG, {
    variables: { profileId: userProfileId, songId },
    refetchQueries: [{ query: QUERY_ME }],
    onError: (error) => console.error('Error removing favorite song:', error),
    onCompleted: () => setIsFavorite(false)
  });

  const handleToggleFavorite = async () => {
    if (!userProfileId) {
      console.error("UserProfileId is not available.");
      return;
    }

    try {
      if (isFavorite) {
        console.log('Removing favorite for songId:', songId);
        await removeFavoriteSong();
      } else {
        console.log('Adding favorite for songId:', songId);
        await addFavoriteSong();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (addError || removeError) {
    console.error('GraphQL Error:', addError || removeError);
    return <p>Error: {(addError || removeError).message}</p>;
  }

  if (addLoading || removeLoading) {
    return <button disabled>Loading...</button>;
  }

  return (
    <button onClick={handleToggleFavorite} className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;

