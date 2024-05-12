const { Profile } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongoose').Types;

const resolvers = {
  Query: {
    profiles: async () => Profile.find(),
    profile: async (parent, { profileId }) => Profile.findById(profileId),
    me: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      return Profile.findById(context.user._id);
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
      if (!profile) throw new AuthenticationError('No user found with this email.');
      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect credentials');
      const token = signToken(profile);
      return { token, profile };
    },
    addFavoriteSong: async (parent, { profileId, songId, songTitle, artist }, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
    
      if (!ObjectId.isValid(songId)) {
        throw new Error('Invalid songId provided');
      }
    
      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        { $addToSet: { favoriteSongs: { _id: new ObjectId(songId), title: songTitle, artist } } },
        { new: true, runValidators: true }
      );
    
      if (!updatedProfile) {
        throw new Error('Profile not found or update failed');
      }
    
      return updatedProfile;
    },
    
    removeFavoriteSong: async (parent, { profileId, songId }, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
    
      if (!ObjectId.isValid(songId)) {
        throw new Error('Invalid songId provided');
      }
    
      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        { $pull: { favoriteSongs: { _id: new ObjectId(songId) } } },
        { new: true }
      );
    
      if (!updatedProfile) {
        throw new Error('Profile not found or update failed');
      }
    
      return updatedProfile;
    },
    
    removeFavoriteSong: async (parent, { profileId, songId }, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      const validSongId = ObjectId.isValid(songId) ? new ObjectId(songId) : null;
      if (!validSongId) throw new Error('Invalid songId provided');
      const updatedProfile = await Profile.findByIdAndUpdate(
        profileId,
        { $pull: { favoriteSongs: { _id: validSongId } } },
        { new: true }
      );
      return updatedProfile;
    },
  },
};

module.exports = resolvers;






