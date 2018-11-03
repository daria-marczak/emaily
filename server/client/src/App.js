import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Hey there</h2>
        <a href="/auth/google">Sign in with Google</a>
        <a href="/auth/github">Sign in with Github</a>

        {/* Localhost will obviously not work in a production environment */}
      </div>
    );
  }
}

export default App;