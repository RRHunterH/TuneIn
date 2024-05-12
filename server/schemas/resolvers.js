// resolvers.js
const { Profile } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        throw new AuthenticationError('Not authenticated');
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
    addFavoriteSong: async (parent, { profileId, songId, songTitle, artist }) => {
      const profile = await Profile.findById(profileId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      profile.favoriteSongs.push({ _id: songId, title: songTitle, artist });
      await profile.save();
      return profile;
    },
    addEvent: async (parent, { profileId, eventName, eventDate, location }) => {
      const profile = await Profile.findById(profileId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      profile.events.push({ eventName, eventDate, location });
      await profile.save();
      return profile;
    },
    removeFavoriteSong: async (parent, { profileId, songId }) => {
      const profile = await Profile.findById(profileId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      profile.favoriteSongs = profile.favoriteSongs.filter(song => song._id.toString() !== songId);
      await profile.save();
      return profile;
    },
    removeEvent: async (parent, { profileId, eventId }) => {
      const profile = await Profile.findById(profileId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      profile.events = profile.events.filter(event => event._id.toString() !== eventId);
      await profile.save();
      return profile;
    },
  },
};

module.exports = resolvers;



