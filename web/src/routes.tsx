import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, Redirect, RouteProps } from 'react-router-dom';
import HeaderBar from './Components/HeaderBar';
import { AuthProvider, Context } from './Context/AuthContext';
import CreateQuestion from './Pages/CreateQuestion';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import QuestionBank from './Pages/QuestionBank';
import QuestionDetail from './Pages/QuestionDetail';

const PrivateRoute: React.FC<RouteProps> = ({ ...rest }) => {
    const { authenticated, loading } = useContext(Context);

    if (!authenticated && !loading) {
        return <Redirect to="/" />
    }

    return (
        <>
            <HeaderBar />
            <Route {...rest} />
        </>
    );
}

const Routes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route component={Login} path="/" exact />
                    <PrivateRoute component={Home} path="/Home" />
                    <PrivateRoute component={CreateQuestion} path="/CreateQuestion" />
                    <PrivateRoute component={QuestionDetail} path="/QuestionDetail" />
                    <PrivateRoute component={Profile} path="/Profile" />
                    <PrivateRoute component={QuestionBank} path="/QuestionBank" />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Routes;