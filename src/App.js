//import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import mock from "./components/mock.component";
import updateUser from "./components/Update-User.component.js";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Pagination from './components/Pagination.component';
//import Users from './components/Users.component';



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
            <br/>
            <Route path="/" exact component={ExercisesList} />
            <Route path="/edit/:id" component={EditExercise} />
            <Route path="/create" component={CreateExercise} />
            <Route path="/user" component={CreateUser} />
            <Route path="/mock" component={mock} />
            <Route path="/Modifier/:uuid" component={updateUser} />


      </div>
    </Router>

  );
}

export default App;

