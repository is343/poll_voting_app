import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";

import { store, history } from "./store";
import "./App.css";
import UserPage from "./containers/User/user_page";
import Navbar from "./containers/Navbar/navbar";
import CreatePoll from "./containers/CreatePoll/create_poll";
import Poll from "./containers/SinglePoll/poll";
import AllPolls from "./containers/AllPolls/all_polls";
import SimpleCard from "./containers/Card/voting_card";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/polls" component={AllPolls} />
              <Route exact path="/poll" component={CreatePoll} />
              <Route exact path="/poll/:poll" component={Poll} />
              <Route exact path="/user/:userId" component={UserPage} />
              <Route exact path="/1" component={SimpleCard} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
