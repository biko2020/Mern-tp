import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';






const Exercise = props => (

    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.gender}</td>
      <td>{props.exercise.dob.substring(0,10)}</td>
      <td>{props.exercise.news}</td>
      <td>{props.exercise.email}</td>
      <td><img src={props.exercise.photo} onError={(e)=>{e.target.onerror = null; e.target.src="img/default.jpg"}}/></td>

      <td>
        <Link to={"/edit/"+props.exercise._id}>Modifier</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>supprimer</a>
      </td>
    </tr>
  )




export default class ExercisesList extends Component {


    constructor(props) {
        super(props);

            this.deleteExercise = this.deleteExercise.bind(this);

            this.state = {exercises: []};   

    }

    componentDidMount() {
        axios.get('http://localhost:5000/tp/')
        .then(response => {
            this.setState({ exercises: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/tp/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        })
      }

      exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }

    render(){


        return(
            <div>
            <h3>la liste des utilisateurs</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>gender</th>
                  <th>dob</th>
                  <th>news</th>
                  <th>email</th>
                  <th>photo</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                { this.exerciseList() }
              </tbody>
            </table>
          </div> 
        )
    }
}