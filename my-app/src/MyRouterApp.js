import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import styled from "styled-components";

const NavUnlisted = styled.ul`

  display: flex;

  a {
    text-decoration: none;
  }

  a:hover {
   background-color: #ddd;
   color: black;
 }

  li {
    color: red;
    margin: 0 0.8rem;
    font-size: 1.3rem;
    position: relative;
    list-style: none;
  }

  .current {
    li {
      border-bottom: 2px solid black;
    }
  }
`;

function Nav() {
  return (
    <NavUnlisted>
      <NavLink to="/" activeClassName="current" exact>
        <li>Home</li>
      </NavLink>
      <NavLink to="/about" activeClassName="current" exact>
        <li>About</li>
      </NavLink>
    </NavUnlisted>
  );
}

function MyRouterApp() {
   return (
      <Router>
      <div>
         <NavUnlisted>
            <NavLink exact activeClassName="current" to="/"><li>Home</li></NavLink>
            <NavLink activeClassName="current" to="/about"><li>About</li></NavLink>
            <NavLink activeClassName="current" to="/contact"><li>Contact</li></NavLink>       
         </NavUnlisted>
         <hr />
      
         {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
         */}
         <Switch>
            <Route exact path="/">
            <Home />
            </Route>
            <Route path="/about">
            <About />
            </Route>
            <Route path="/contact">
            <Contact />
            </Route>
         </Switch>
      </div>
      </Router>
   )
}

export { MyRouterApp };

class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
      )
   }
}
export { Home };

class About extends React.Component {
   render() {
      return (
         <div>
            <h1>About...</h1>
         </div>
      )
   }
}
export { About };

class Contact extends React.Component {
   render() {
      return (
         <div>
            <h1>Contact...</h1>
         </div>
      )
   }
}
export {Contact};