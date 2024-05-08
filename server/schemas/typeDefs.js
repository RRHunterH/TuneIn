const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    favorites: [Favorite]!
  }
  type Favorite {
    _id: ID
    songId: String
    eventId: String
    songTitle: String
    eventTitle: String
  }
  type AuthPayload {
    token: String
    user: User
  }
  type Song {
    _id: ID
    title: String
    lyrics: String
    artist: String
  }
  type Event {
    _id: ID
    title: String
    date: String
    venue: String
  }
  type Query {
    me: User
    getFavorites: [Favorite]
    searchSongs(keyword: String!): [Song]
    searchEvents(keyword: String!): [Event]
  }
  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addFavorite(songId: String, eventId: String): Favorite
    removeFavorite(favoriteId: ID!): Favorite
  }
`;

module.exports = typeDefs;
