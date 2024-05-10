import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_FAVORITE_SONG = gql`
  mutation addFavoriteSong($profileId: ID!, $songId: ID!, $songTitle: String!, $artist: String!) {
    addFavoriteSong(profileId: $profileId, songId: $songId, songTitle: $songTitle, artist: $artist) {
      _id
      name
      favoriteSongs {
        _id
        title
        artist
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($profileId: ID!, $eventName: String!, $eventDate: String!, $location: String!) {
    addEvent(profileId: $profileId, eventName: $eventName, eventDate: $eventDate, location: $location) {
      _id
      name
      events {
        _id
        name
        date
        location
      }
    }
  }
`;
