const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You are not authenticated');
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
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addFavoriteSong: async (parent, { profileId, songId, songTitle, artist }) => {
      try {
        // Find the profile by ID
        const profile = await Profile.findById(profileId);

        if (!profile) {
          throw new Error('Profile not found');
        }

        // Add the favorite song to the profile
        profile.favoriteSongs.push({ _id: songId, title: songTitle, artist });

        // Save the updated profile
        await profile.save();

        return profile;
      } catch (error) {
        console.error('Error adding favorite song:', error);
        throw new Error('Failed to add favorite song');
      }
    },

    addEvent: async (parent, { profileId, eventName, eventDate, location }) => {
      try {
        // Find the profile by ID
        const profile = await Profile.findById(profileId);

        if (!profile) {
          throw new Error('Profile not found');
        }

        // Add the event to the profile
        profile.events.push({ eventName, eventDate, location });

        // Save the updated profile
        await profile.save();

        return profile;
      } catch (error) {
        console.error('Error adding event:', error);
        throw new Error('Failed to add event');
      }
    },
  },
};

module.exports = resolvers;

