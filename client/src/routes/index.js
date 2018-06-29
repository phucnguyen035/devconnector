import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer';
import Landing from '../components/layout/Landing';
import Signup from '../components/auth/signup';
import Signin from '../components/auth/signin';
import Dashboard from '../components/dashboard';
import CreateProfile from '../components/profile/CreateProfile';
import EditProfile from '../components/profile/EditProfile';
import AddExperience from '../components/credentials/AddExperience';
import AddEducation from '../components/credentials/AddEducation';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
