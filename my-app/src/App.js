import React, { Component } from 'react';
import logo from './nyt-logo-8.jpeg';
//import Search from './components/search.js';
//import Saved from './components/saved.js';
import './App.css';


class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="Main-header">          
          <img src={logo} className="App-logo" alt="logo" />
          <h2>New York Times Scrubber</h2>
        </div>   
          <Search title="Search"></Search>  
      </div>
    );
  }
} 
 
class Search extends Component {
  render(){
    return (
      <div className="Search">
        <header className="Search-header">{this.props.title}</header>
        <form className="Search-form" action="GET">
            <label>
              Topic:
              <input type="text" name="topic"/>
              Start Year:
              <input type="text" name="start-year"/>
              End Year:
              <input type="text" name="end-year"/>
              <input type="submit" value="Submit"/>
            </label>
          </form>
      </div>
    );
  }
}


export default Main;

