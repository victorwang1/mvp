import React from 'react';
import $ from 'jquery';
import Account from './AccountView.js';
import Map from './MapView.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Account />
        <Map />
      </div>
    );
  }
}

export default App;
