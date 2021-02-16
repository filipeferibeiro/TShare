import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, Redirect, RouteProps } from 'react-router-dom';
import { AuthProvider, Context } from './Context/AuthContext';
import CreateQuestion from './Pages/CreateQuestion';
import Home from './Pages/Home';
import Login from './Pages/Login';
import QuestionDetail from './Pages/QuestionDetail';

const PrivateRoute: React.FC<RouteProps> = ({ ...rest }) => {
    const { authenticated } = useContext(Context);

    if (!authenticated) {
        return <Redirect to="/" />
    }

    return <Route {...rest} />

}

const Routes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route component={Login} path="/" exact />
                    <PrivateRoute component={Home} path="/Home" />
                    <PrivateRoute component={CreateQuestion} path="/CreateQuestion" />
                    <PrivateRoute component={QuestionDetail} path="/QuestionDetail" />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Routes;
