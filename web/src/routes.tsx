import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, RouteProps, Redirect } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Components/Layout';
import Pg2 from './Pages/Pg2';
import Search from './Pages/Search';
import Login from './Pages/Login';
import { AuthProvider, Context } from './Context/AuthContext';
import Profile from './Pages/Profile';
import CreateQuestion from './Pages/CreateQuestion';
import QuestionBank from './Pages/QuestionBank';
import QuestionDetail from './Pages/QuestionDetail';
import { ApplicationContext } from './Context/ApplicationContext';

const PrivateRoute: React.FC<RouteProps> = ({ ...rest }) => {
    const { authenticated, loading } = useContext(Context);

    if (!authenticated && !loading) {
        return <Redirect to="/" />
    }

    return (
        <Route {...rest} />
    );
}

const Routes = () => {
    return (
        <BrowserRouter>
        <AuthProvider>
        <ApplicationContext>
            <Layout>
                    <Switch>
                        <Route component={Login} path="/" exact />
                        <PrivateRoute component={Home} path="/Home" />
                        <PrivateRoute component={Profile} path="/Profile" />
                        <PrivateRoute component={CreateQuestion} path="/CreateQuestion" />
                        <PrivateRoute component={QuestionBank} path="/QuestionBank" />
                        <PrivateRoute component={QuestionDetail} path="/QuestionDetail/:idQuestion" />
                        <PrivateRoute component={Search} path="/Search" />
                    </Switch>
            </Layout>
        </ApplicationContext>
        </AuthProvider>
        </BrowserRouter>
    );
}

export default Routes;