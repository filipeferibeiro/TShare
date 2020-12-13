import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import CreateQuestion from './Pages/CreateQuestion';
import Home from './Pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateQuestion} path="/CreateQuestion" />
        </BrowserRouter>
    );
}

export default Routes;