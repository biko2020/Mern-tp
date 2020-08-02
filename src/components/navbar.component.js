import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">MERN STACK</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">List des utilisateurs</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Creation TP</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create Utilisateur</Link>
          </li>
          <li className="navbar-item">
          <Link to="/mock" className="nav-link">mock</Link>
          </li>

        </ul>
        </div>
      </nav>
    );
  }
}
