const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    me: (_, __, { profile }) => {
      return Profile.findById(profile.id);
    },
    getFavorites: (_, __, { profile }) => {
      return Profile.findById(profile.id).populate('favorites');
    },
    searchSongs: async (_, { keyword }) => {
      // not sure what this is in the db
      return searchSongsInDatabase(keyword);
    },
    searchEvents: async (_, { keyword }) => {
      // events
      return searchEventsInDatabase(keyword);
    }
  },
  
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const profile = new Profile({ username, email, password: hashedPassword });
      await profile.save();
      const token = jwt.sign({ id: profile._id }, process.env.JWT_SECRET);
      return { token, profile };
    },
    login: async (_, { email, password }) => {
      const profile = await Profile.findOne({ email });
      const valid = await bcrypt.compare(password, profile.password);
      if (!valid) {
        throw new Error('Incorrect credentials');
      }
      const token = jwt.sign({ id: profile._id }, process.env.JWT_SECRET);
      return { token, profile };
    },
    addFavorite: async (_, { songId, eventId }, { profile }) => {
      const favorite = { songId, eventId };
      await Profile.findByIdAndUpdate(profile.id, { $push: { favorites: favorite } });
      return favorite;
    },
    removeFavorite: async (_, { favoriteId }, { profile }) => {
      await Profile.findByIdAndUpdate(profile.id, { $pull: { favorites: { _id: favoriteId } } });
      return { _id: favoriteId };
    }
  }
};

module.exports = resolvers;
