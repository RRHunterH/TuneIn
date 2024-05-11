const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    favoriteSongs: [Song]    # New field for favorite songs
    events: [Event]          # New field for events
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
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFavoriteSong(profileId: ID!, songId: ID!, songTitle: String!, artist: String!): Profile   # New mutation for adding favorite songs
    addEvent(profileId: ID!, eventName: String!, eventDate: String!, location: String!): Profile   # New mutation for adding events
  }
`;

module.exports = typeDefs;
