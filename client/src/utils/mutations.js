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
export const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_FAVORITE = gql`
  mutation addFavorite($songId: String, $eventId: String) {
    addFavorite(songId: $songId, eventId: $eventId) {
      _id
      songTitle
      eventTitle
    }
  }
`;
export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($favoriteId: ID!) {
    removeFavorite(favoriteId: $favoriteId) {
      _id
    }
  }
`;



// export const ADD_FAVORITE_EVENT = gql`
//   mutation addFavoriteEvent($profileId: ID!, $songId: ID!, $songTitle: String!, $artist: String!) {
//     addFavoriteEvent(profileId: $profileId, songId: $songId, songTitle: $songTitle, artist: $artist) {
//       _id
//       name
//       likedSongs {
//         _id
//         title
//         artist
//       }
//     }
//   }
// `;

// export const REMOVE_FAVORITE_EVENT = gql`
//   mutation addFavoriteEvent($profileId: ID!, $songId: ID!, $songTitle: String!, $artist: String!) {
//     addFavoriteEvent(profileId: $profileId, songId: $songId, songTitle: $songTitle, artist: $artist) {
//       _id
//       name
//       likedSongs {
//         _id
//         title
//         artist
//       }
//     }
//   }
// `;