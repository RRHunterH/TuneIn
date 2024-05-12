  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import App from './App';
  import Home from './pages/Home';
  import Profile from './pages/Profile';
  import Login from './pages/Login';
  import Signup from './pages/Signup';
  import './index.css';

  // HTTP connection to the GraphQL API
  const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
  });

  // Middleware to attach the token to requests
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

  // Apollo client setup
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </React.StrictMode>
  );
