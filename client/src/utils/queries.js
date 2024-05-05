import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;
