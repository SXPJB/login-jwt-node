import React, {useState,useEffect} from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from "axios";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import {getToken,removeUserSession,setUserSession} from "./utils/Common";

function App() {
  const [authLoading,setAuthLoading]=useState(true);

  useEffect(()=>{
    const token=getToken();
    if(!token){
      return;
    }
    axios({
      method: 'get',
      url:'http://localhost:4000/verifyToken',
      params:{
        token:token
      }
    }).then(res=>{
      setUserSession(res.data.token,res.data.user);
      setAuthLoading(false)
    }).catch(e=>{
      removeUserSession();
      setAuthLoading(false)
    })
  },[])
  if(authLoading&&getToken()){
    return <div className="content">Authentication...</div>
  }

  return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">Home</NavLink>
              <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
              <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
