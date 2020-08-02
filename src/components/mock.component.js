
import React, { Component } from 'react';
import styles from './App.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USERS_PER_PAGE } from '../utils/constants';



export default class MockList extends Component{

 
  state = {
    users: null,
    total: USERS_PER_PAGE,
    per_page: 10,
    current_page: 1
   
    
  }

 
  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }
  
  SupprimerUser(id) {
    axios.delete('https://randomuser.me/api/?'+id)
    
      .then(response => { console.log(response.data.login.uuid)});

    this.setState({
      user: this.state.user.filter(el => el.uuid !== id)
    })
    
  
  }
  makeHttpRequestWithPage = async pageNumber => {
 
    const response = await fetch(`https://randomuser.me/api/?results=10`, {

    });

    const data = await response.json();

    this.setState({
      users: data.results,
      current_page: data.page
    });
  }
 

  render() {
    
    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map(user => (
        <tr key={user.login.uuid}>
          <td>{user.login.username}</td>
          <td>{user.gender}</td>
          <td>{user.dob.date.substring(0,10)}</td>
          <td>{user.login.salt}</td>
          <td>{user.email}</td>
          <td><img src={user.picture.thumbnail}/></td>
           
          <td>
          <Link to={"/Modifier/"+user.login.uuid}>Modifier</Link> | <a href="#" onClick={() => { users.SupprimerUser(user.login.uuid) }}>supprimer</a>
          </td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(' | ',i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? styles.active : '';

        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
          
        );
      });
    }
    
    return (


      <div className={styles.app}>
            <h3> utilisateurs</h3>
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
                {users}
              </tbody>
            </table>

        <div className={styles.pagination}>
          <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#"onClick={() => this.makeHttpRequestWithPage(1)}>Previous</a></li>
            <li class="page-item"><a class="page-link" href="#" onClick={() => this.makeHttpRequestWithPage(2)}>{renderPageNumbers} </a></li>
            <li class="page-item"><a class="page-link" href="#" onClick={()=> this.makeHttpRequestWithPage(1)} >Next</a></li>
          </ul>
        </nav>
        </div>
    </div>  
    );
  }

}