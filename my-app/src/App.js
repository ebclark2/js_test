import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function Button(props) {
  const handleClick = () => props.onClickFunction(props.increment);
  return (
    <button onClick={handleClick}>
    +{props.increment}
  </button>
  );
}

function Display(props) {
  return (
    <div>{props.message}</div>
  )
}

function Example() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = (i) => setCounter(counter + i);
  return (
    <>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={2} />
      <Button onClickFunction={incrementCounter} increment={4} />
      <Button onClickFunction={incrementCounter} increment={8} />
      <Button onClickFunction={incrementCounter} increment={16} />
      <Display message={counter} />
    </>
  )
}

const testData = [
  {
    "login": "mojombo",
    "id": 1,
    "node_id": "MDQ6VXNlcjE=",
    "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/mojombo",
    "html_url": "https://github.com/mojombo",
    "followers_url": "https://api.github.com/users/mojombo/followers",
    "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
    "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
    "organizations_url": "https://api.github.com/users/mojombo/orgs",
    "repos_url": "https://api.github.com/users/mojombo/repos",
    "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
    "received_events_url": "https://api.github.com/users/mojombo/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "defunkt",
    "id": 2,
    "node_id": "MDQ6VXNlcjI=",
    "avatar_url": "https://avatars.githubusercontent.com/u/2?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/defunkt",
    "html_url": "https://github.com/defunkt",
    "followers_url": "https://api.github.com/users/defunkt/followers",
    "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
    "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
    "organizations_url": "https://api.github.com/users/defunkt/orgs",
    "repos_url": "https://api.github.com/users/defunkt/repos",
    "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
    "received_events_url": "https://api.github.com/users/defunkt/received_events",
    "type": "User",
    "site_admin": false
  } ]

class Card extends React.Component {
  render() {
    const profile = this.props;
    return(
      <div className="github-profile">
        <img src={profile.avatar_url} alt="avatar"></img>
        <div className="info">
          <div className="login">{profile.login}</div>
        </div>
      </div>
    )
  }
}

function sleep(milliseconds) {  
  return new Promise(resolve => setTimeout(resolve, milliseconds));  
}  

async function getUsers() {
  await sleep(3000);
  const response = await fetch("https://api.github.com/users");
  if (!response.ok) {
    throw new Error("Unable to fetch users");
  }
  const json = await response.json();
  return json;
}

class GithubCards extends React.Component {
  constructor(props) {
    super(props);
    this.users = null;
//    console.log(`JSON: ${test}`);
  }
  render() {
    const users = (this.state && this.state.users ? this.state.users : []);
    if(!this.state || !this.state.users) {
      getUsers().then(json => { 
        
        if (json && json.length > 0) {
          console.log(`JSON: ${json}`);
          //this.users = json;
          this.setState({users: json});
        }  
      });
      return (<div>Loading...</div>);
    } else {
      return (
        <div>
          { users.map(user => <Card key={user.id} {...user} />)}
        </div>
      );
    }
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button>TEST</button>
      </header>
      <main>
        <GithubCards />
      </main>
    </div>
  );
}

export default App;
