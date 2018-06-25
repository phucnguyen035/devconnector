import React from 'react';
import moment from 'moment';

const Footer = () => (
  <footer className="bg-dark text-white mt-5 p-4 text-center">
    Copyright &copy; {moment().format('YYYY')} Devconnector
  </footer>
);

export default Footer;
