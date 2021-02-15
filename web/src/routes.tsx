import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import CreateQuestion from './Pages/CreateQuestion';
import Home from './Pages/Home';
import Login from './Pages/Login';
import QuestionDetail from './Pages/QuestionDetail';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact />
            <Route component={Home} path="/Home" />
            <Route component={CreateQuestion} path="/CreateQuestion" />
            <Route component={QuestionDetail} path="/QuestionDetail" />
        </BrowserRouter>
    );
}

export default Routes;
