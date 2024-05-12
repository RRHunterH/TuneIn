import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_SONG } from "../../utils/mutations";
import AuthService from '../../utils/auth';

const FavoriteButton = ({ songId, songTitle, artist, isFavoriteInitially }) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);
  const [userProfileId, setUserProfileId] = useState(null);

  useEffect(() => {
    const profile = AuthService.getProfile();
    setUserProfileId(profile?._id);
  }, []);

  const [addFavoriteSong, { error, data }] = useMutation(ADD_FAVORITE_SONG, {
    onError: (err) => console.error("Error adding favorite:", err),
    onCompleted: (data) => {
      console.log("Added favorite:", data);
      setIsFavorite(true);  // Update the local state to reflect the change
    }
  });

  const handleAddFavoriteSong = async () => {
    console.log("Trying to add favorite for profile:", userProfileId);
    if (!userProfileId) {
      console.error("UserProfileId is not available.");
      return;
    }

    try {
      await addFavoriteSong({
        variables: { profileId: userProfileId, songId, songTitle, artist }
      });
    } catch (error) {
      console.error('Error adding favorite song:', error);
    }
  };

  return (
    <button onClick={handleAddFavoriteSong}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;


