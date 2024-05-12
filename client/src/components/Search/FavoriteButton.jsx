import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_SONG, REMOVE_FAVORITE_SONG } from "../../utils/mutations";
import AuthService from '../../utils/auth';

const FavoriteButton = ({ songId, title, artist, isFavoriteInitially }) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);
  const [userProfileId, setUserProfileId] = useState(null);

  useEffect(() => {
    const profile = AuthService.getProfile();
    if (profile && profile._id) {
      setUserProfileId(profile._id);
      console.log("UserProfileId set:", profile._id);
    } else {
      console.log("UserProfileId is not available.");
    }
  }, []);

  const [addFavoriteSong] = useMutation(ADD_FAVORITE_SONG, {
    variables: { profileId: userProfileId, songId, title, artist },
    refetchQueries: [{ query: QUERY_ME }],
    onError: (error) => console.error('Error adding favorite song:', error),
    onCompleted: () => setIsFavorite(true)
  });

  const [removeFavoriteSong] = useMutation(REMOVE_FAVORITE_SONG, {
    variables: { profileId: userProfileId, songId },
    refetchQueries: [{ query: QUERY_ME }],
    onError: (error) => console.error('Error removing favorite song:', error),
    onCompleted: () => setIsFavorite(false)
  });

  const handleToggleFavorite = async () => {
    console.log("Trying to add favorite for profile:", userProfileId);
    if (!userProfileId) {
      console.error("UserProfileId is not available.");
      return;
    }

    if (isFavorite) {
      console.log("Removing favorite...");
      await removeFavoriteSong();
    } else {
      console.log("Adding favorite...");
      await addFavoriteSong();
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;


