import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import GameBoard from "./GameBoard";
import configureStore from "../redux/configureStore";
const store = configureStore();

const App = () => (
  <div className="container-fluid">
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/game" render={() => <GameBoard />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
