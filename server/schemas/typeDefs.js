const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    favoriteSongs: [Song]   
    events: [Event]          
  }

  type Song {
    _id: ID!
    title: String!
    artist: String!
  }

  type Event {
    _id: ID!
    eventName: String!
    eventDate: String!
    location: String!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFavoriteSong(profileId: ID!, songId: ID!, songTitle: String!, artist: String!): Profile
    addEvent(profileId: ID!, eventName: String!, eventDate: String!, location: String!): Profile
    removeFavoriteSong(profileId: ID!, songId: ID!): Profile
    removeEvent(profileId: ID!, eventId: ID!): Profile
  }
`;

module.exports = typeDefs;

