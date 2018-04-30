import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";

import { store, history } from "./store";
import "./App.css";
import Users from "./components/User/users";
import Navbar from "./components/Navbar/navbar";
import CreatePoll from "./components/CreatePoll/create_poll";

const Poll = props => {
  console.log(props);
  return <h1> Poll {props.match.params.poll} </h1>;
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/polls" component={CreatePoll} />
              <Route exact path="/poll" component={CreatePoll} />
              <Route exact path="/poll/:poll" component={Poll} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
