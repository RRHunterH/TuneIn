const { Profile } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongoose').Types;

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
        throw new AuthenticationError('You need to be logged in!');
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
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addFavoriteSong: async (parent, { profileId, songId, songTitle, artist }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const validSongId = ObjectId.isValid(songId) ? new ObjectId(songId) : null;
      if (!validSongId) {
        throw new Error('Invalid songId provided');
      }

      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        { $push: { favoriteSongs: { _id: validSongId, title: songTitle, artist } } },
        { new: true, runValidators: true }
      );

      return updatedProfile;
    },
    removeFavoriteSong: async (parent, { profileId, songId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const validSongId = ObjectId.isValid(songId) ? new ObjectId(songId) : null;
      if (!validSongId) {
        throw new Error('Invalid songId provided');
      }

      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        { $pull: { favoriteSongs: { _id: validSongId } } },
        { new: true }
      );

      return updatedProfile;
    },
    // Include other mutations if necessary
  },
};

module.exports = resolvers;




