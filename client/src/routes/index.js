import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Landing from '../components/layout/Landing';
import Signup from '../components/auth/signup';
import Signin from '../components/auth/signin';

const AppRouter = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </div>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
