const { Profile } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express'); // Correct import

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You are not authenticated'); // Correct usage
      }
      return Profile.findOne({ _id: context.user._id });
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('Incorrect email or password'); // Correct usage
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password'); // Correct usage
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addFavoriteSong: async (parent, { profileId, songId, songTitle, artist }) => {
      try {
        const profile = await Profile.findById(profileId);

        if (!profile) {
          throw new Error('Profile not found');
        }

        profile.favoriteSongs.push({ _id: songId, title: songTitle, artist });
        await profile.save();

        return profile;
      } catch (error) {
        console.error('Error adding favorite song:', error);
        throw new Error('Failed to add favorite song');
      }
    },

    addEvent: async (parent, { profileId, eventName, eventDate, location }) => {
      try {
        const profile = await Profile.findById(profileId);

        if (!profile) {
          throw new Error('Profile not found');
        }

        profile.events.push({ eventName, eventDate, location });
        await profile.save();

        return profile;
      } catch (error) {
        console.error('Error adding event:', error);
        throw new Error('Failed to add event');
      }
    },

    removeFavoriteSong: async (parent, { profileId, songId }) => {
      try {
        const profile = await Profile.findById(profileId);

        if (!profile) {
          throw new Error('Profile not found');
        }

        profile.favoriteSongs = profile.favoriteSongs.filter(song => song._id.toString() !== songId);
        await profile.save();

        return profile;
      } catch (error) {
        console.error('Error removing favorite song:', error);
        throw new Error('Failed to remove favorite song');
      }
    },

    removeEvent: async (parent, { profileId, eventId }) => {
      try {
        const profile = await Profile.findById(profileId);

        if (!profile) {
          throw new Error('Profile not found');
        }

        profile.events = profile.events.filter(event => event._id.toString() !== eventId);
        await profile.save();

        return profile;
      } catch (error) {
        console.error('Error removing event:', error);
        throw new Error('Failed to remove event');
      }
    },
  },
};

module.exports = resolvers;


