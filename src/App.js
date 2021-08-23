import React from "react";
import SignUp from "./pages/sign-up";

import { AuthProvider } from "../src/contexts/AuthContext";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import NoMatch from "./pages/no-match";
import Post from "./pages/post";
import Create from "./pages/create";
import SignIn from "./pages/sign-in";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <h2>Firebase Blog</h2>
        </Link>
      </nav>
      <AuthProvider>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/404" component={NoMatch} />
            <Route path="/:slug" component={Post} />
          </Switch>
        </main>
      </AuthProvider>

    </Router>
  );
}

export default App;
