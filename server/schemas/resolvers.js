const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      return User.findById(user.id);
    },
    getFavorites: (_, __, { user }) => {
      return User.findById(user.id).populate('favorites');
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
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect credentials');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return { token, user };
    },
    addFavorite: async (_, { songId, eventId }, { user }) => {
      const favorite = { songId, eventId };
      await User.findByIdAndUpdate(user.id, { $push: { favorites: favorite } });
      return favorite;
    },
    removeFavorite: async (_, { favoriteId }, { user }) => {
      await User.findByIdAndUpdate(user.id, { $pull: { favorites: { _id: favoriteId } } });
      return { _id: favoriteId };
    }
  }
};

module.exports = resolvers;
