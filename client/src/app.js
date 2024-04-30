import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                // Other routes
            </Switch>
        </Router>
    );
}

export default App;
