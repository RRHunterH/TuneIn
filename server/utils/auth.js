const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretssshhhhhhh';  // Ensure this is securely managed, e.g., environment variable
const expiration = '2h';

module.exports = {
  // AuthenticationError is now correctly referenced as a class to throw new instances when needed
  authMiddleware: function ({ req }) {
    // Token could be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Extract the token from Bearer <token> format (common practice in headers)
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      // Verify the token and attach the decoded user's data to the request so it can be accessed in the resolver
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log('Invalid token:', error.message);
      // Optional: Throw an AuthenticationError if you want to make this explicit
    }

    return req;  // Return the modified request object to be used as context in GraphQL resolvers
  },

  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    // Sign the token with the user payload, secret and expiration
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // Directly reference and use AuthenticationError when throwing auth related errors
  AuthenticationError,
};
