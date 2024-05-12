import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_SONG, REMOVE_FAVORITE_SONG } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import AuthService from '../../utils/auth';

const FavoriteButton = ({ songId, title, artist, isFavoriteInitially }) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);
  const [userProfileId, setUserProfileId] = useState(null);

  useEffect(() => {
    const profile = AuthService.getProfile();
    if (profile?._id) {
      setUserProfileId(profile._id);
    }
  }, []);

  const [addFavoriteSong, { error: addError, loading: addLoading }] = useMutation(ADD_FAVORITE_SONG, {
    variables: { profileId: userProfileId, songId, songTitle: title, artist },
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
      console.log('Toggling favorite. Song ID:', songId, 'Profile ID:', userProfileId); // Log the IDs
      if (isFavorite) {
        await removeFavoriteSong();
      } else {
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
