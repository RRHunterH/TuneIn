import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      email 
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      email  
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email  
    }
  }
`;

export const GET_FAVORITE_SONGS = gql`
  query getFavoriteSongs {
    me {
      _id
      favoriteSongs {
        _id
        title
        artist
      }
    }
  }
`;

export const GET_FAVORITE_EVENTS = gql`
  query getFavoriteEvents {
    me {
      _id
      favoriteEvents {
        _id
        eventName
        eventDate
        location
      }
    }
  }
`;
