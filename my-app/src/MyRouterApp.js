import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

class MyRouterApp extends React.Component {
   render() {
      return (
         <Router>
         <div>
            <div>
               <NavLink exact class="topnavlink" to="/">Home</NavLink>
               <NavLink class="topnavlink" to="/about">About</NavLink>
               <NavLink class="topnavlink" to="/contact">Contact</NavLink>       
            </div>
           <br />
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