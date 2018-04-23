import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {getUsers} from '../../store/actions/users'
import './users.css';

import axios from 'axios';

class Users extends Component {

  static propTypes = {
    getusers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  }

  static defaultProps = {
    users: []
  }

  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
      <button onClick={() => {
        // axios.post('/api/users', {
        //   firstName: 'Test',
        //   lastName: 'TESTER'
        // });
        console.log(localStorage.getItem('token'));        
      }}>
        GET LOCAL TOKEN
      </button>
      <button onClick={() => {
          axios.post('/api/auth/login', {
            "username": "test2",
            "password": "password"
          })
          .then((res) => {
            localStorage.setItem('token', res.data.token);
          });
      }}>
        LOGIN!
      </button>
        <h2>Users</h2>
        <ul>
        {this.props.users.map(user =>
          <li key={user._id}>{user.username} Polls: {user.polls.length}</li>
        )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

const dispatchToProps = (dispatch) => ({
   getUsers: () => dispatch(getUsers())
})

export default connect(mapStateToProps, dispatchToProps)(Users);
