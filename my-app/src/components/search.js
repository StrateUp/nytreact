import React, { Component } from 'react';
    
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

module.exports = Search;