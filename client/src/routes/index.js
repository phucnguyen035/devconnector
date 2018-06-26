import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer';
import Landing from '../components/layout/Landing';
import Signup from '../components/auth/signup';
import Signin from '../components/auth/signin';
import Dashboard from '../components/dashboard';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="App">
      <Navbar history={history} />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
