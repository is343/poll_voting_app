import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";

import { store, history } from "./store";
import "./App.css";
import Users from "./components/User/users";
import AppBar from "./components/Navbar/appbar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppBar />
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/1" component={Users} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
