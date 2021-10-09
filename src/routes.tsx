import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import { AppNotificationComponent } from './context/AppNotificationContext';
import { AuthProvider, Context } from './context/AuthContext';
import { PopupComponent } from './context/PopupContext';
import BankDetail from './pages/BankDetail';
import EditQuestion from './pages/EditQuestion';
import Feed from './pages/Feed';
import ListBanks from './pages/ListBanks';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Question from './pages/Question';
import QuestionDetail from './pages/QuestionDetail';
import Search from './pages/Search';
import Settings from './pages/Settings';

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
        <AppNotificationComponent>
        <PopupComponent>
        <Layout>
            <Switch>
                <Route component={Login} path="/" exact />
                <PrivateRoute component={Feed} path="/home" />
                <PrivateRoute component={QuestionDetail} path="/questionDetail/:idQuestion" />
                <PrivateRoute component={Question} path="/newQuestion" />
                <PrivateRoute component={Profile} path="/profile/:userId" />
                <PrivateRoute component={Search} path="/search" />
                <PrivateRoute component={ListBanks} path="/banks" exact/>
                <PrivateRoute component={BankDetail} path="/banks/:bankId" />
                <PrivateRoute component={EditQuestion} path="/question/:idQuestion" />
                <PrivateRoute component={Settings} path="/settings" />
            </Switch>
        </Layout>
        </PopupComponent>
        </AppNotificationComponent>
        </AuthProvider>
        </BrowserRouter>
    );
}

export default Routes;