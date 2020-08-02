import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercises extends Component {

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeNews = this.onChangeNews.bind(this);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePhoto= this.onChangePhoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    


        this.state = {
           
            username:'',
            gender:'',
            dob: new Date(),
            news: true,
            email:'',
            photo:'',

            users: [],
            genders:[]
        }
    }

    componentDidMount() {

       this.setState({

            genders: ['Male','Female'],
            
        })
        axios.get('http://localhost:5000/tp/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            username: response.data.username,
            gender: response.data.gender,
            dob: new Date(response.data.dob),
            news: response.data.news,
            email: response.data.email,
            photo: response.data.photo
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
      axios.get('http://localhost:5000/users/')
      .then(response =>{
        if(response.data.length > 0 ) {
          this.setState({

            users: response.data.map(user => user.username),

            
          })
        }
      })

    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onChangeDob(date) {
        this.setState({
            dob: date
        });
    }
    onChangeNews(e) {
        this.setState({
            news: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePhoto(e) {
        this.setState({
            photo: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const  exercice = {
            username: this.state.username,
            gender: this.state.gender,
            dob: this.state.dob,
            news: this.state.news,
            email: this.state.email,
            photo: this.state.photo
        }
        console.log(exercice);

        axios.post('http://localhost:5000/tp/update/'+this.props.match.params.id, exercice)
        .then(res => console.log(res.data));
  
      this.setState({
        username: ''
      })

        window.location = '/';
    }

    render() {
        return (
        <div>
          <h3>Edite Exercise</h3>
          <form onSubmit = {this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                  {
                    this.state.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Gender: </label>
              <select ref="genderInput"
                  required
                  className="form-control"
                  value={this.state.gender}
                  onChange={this.onChangeGender}>
                  {
                    this.state.genders.map(function(gender) {
                      return <option 
                        key={gender}
                        value={gender}>{gender}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group">
              <label>dob: </label>
              <div>
                <DatePicker
                  selected={this.state.dob}
                  onChange={this.onChangeDob}
                />
              </div>
            </div>
            <div className="form-group">
              <label>News: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.news}
                  onChange={this.onChangeNews}
                  />
            </div>
            <div className="form-group">
              <label>E-mail: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
            </div>
            <div className="form-group">
              <label>Photo: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.photo}
                  onChange={this.onChangePhoto}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Edite Exercise" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}