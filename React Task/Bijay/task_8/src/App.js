import { Component } from "react";

import "./App.css";
import Login from "./components/auth/Login";
import LoginClass from "./components/auth/LoginClass";
import ErrorPage from "./components/ErrorPage.jsx";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Homepage from "./components/Dashboard/Homepage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
    };
  }

  handleLogin = params => {
    console.log("handle Login", params);
    this.setState({
      isLogged: params,
    });
  };
  componentDidMount()
{
  console.log("auth mout")
}
  render() {
    const { isLogged } = this.state;

    return (
      <div className="app">
       <ChildCompoent isLogged ={isLogged} handleLogin={this.handleLogin}/>
      </div>
    );
  }
}


const ChildCompoent = ({isLogged,handleLogin})=>{
  return (
    <Switch>
    {/* <Route path="/" exact component={Login} /> */}
    <Route
      path="/"
      exact
      render={() =>
        !isLogged ? (
          <LoginClass isLogin={handleLogin} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
    <Route
      path="/dashboard"
      exact
      render={() =>
        isLogged ? (
          <Homepage isLogin={handleLogin} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
    {/* {isLogin ? <Redirect to="/dashboard" /> : <Redirect to="/" /> } */}
    {/* <Redirect exact from="/login" to="/" /> */}
    <Route path="*" component={ErrorPage} />
    <Redirect to="/" />
  </Switch>
  )
}

export default App;
