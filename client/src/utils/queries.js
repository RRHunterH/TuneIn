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
      favoriteSongs {
        _id
        title
        artist
      }
      favoriteEvents {
        _id
        eventName
        eventDate
        location
      }
    }
  }
`;

