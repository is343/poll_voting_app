import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { getPolls } from "../../store/actions/polls";
import "./users.css";

import axios from "axios";

class Users extends Component {
  static propTypes = {
    getPolls: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  static defaultProps = {
    users: []
  };

  componentWillMount() {
    this.props.getPolls();
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.navigateTo("/");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            console.log(localStorage.getItem("token"));
          }}
        >
          GET LOCAL TOKEN
        </button>
        <button
          onClick={() => {
            axios
              .post("/api/auth/login", {
                username: "test2",
                password: "password"
              })
              .then(res => {
                localStorage.setItem("token", res.data.token);
              });
          }}
        >
          LOGIN!
        </button>
        <h2>Users</h2>
        <ul>
          {this.props.users.map(user => (
            <li key={user._id}>
              {user.username} Polls: {user.polls.length}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const dispatchToProps = dispatch => ({
  getPolls: () => dispatch(getPolls()),
  navigateTo: location => dispatch(push(location))
});

export default connect(mapStateToProps, dispatchToProps)(Users);
