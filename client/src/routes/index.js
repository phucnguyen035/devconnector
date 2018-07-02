import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer';
import Landing from '../components/layout/Landing';
import Signup from '../components/auth/signup';
import Signin from '../components/auth/signin';
import Dashboard from '../components/dashboard/Dashboard';
import CreateProfile from '../components/dashboard/CreateProfile';
import EditProfile from '../components/dashboard/EditProfile';
import AddExperience from '../components/credentials/AddExperience';
import AddEducation from '../components/credentials/AddEducation';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile/Profile';
import NotFound from '../components/not-found/NotFound';
import Posts from '../components/posts/Posts';
import Post from '../components/post/Post';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/profiles" component={Profiles} />
          <Route path="/profile/:handle" component={Profile} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/create-profile" component={CreateProfile} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/add-experience" component={AddExperience} />
          <PrivateRoute path="/add-education" component={AddEducation} />
          <PrivateRoute path="/feed" component={Posts} />
          <PrivateRoute path="/post/:id" component={Post} />
          <Route exact path="/not-found" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
